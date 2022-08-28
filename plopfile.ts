// Plop script for templating out a converged mdx post
import { NodePlopAPI } from "plop";
import { findGitRoot } from "./scripts/monorepo";
import { slugify } from "./scripts/slugify";
import { LANGUAGE_LIST } from "./constants";
import { nextId } from "./scripts/uuid";

import { Answers as inquirerAnswer } from "inquirer";

import inquirerSearchList from "inquirer-search-list";

import { Author, Post, BlogType, BlogTypeArr } from "./@global/index";
import { doc, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { authorCol, postCol } from "./scripts/firestore/index";

const root = findGitRoot();

interface CreateAnswers {
  blogType: BlogType;
  author: Author;
  slug: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
}

interface CreateData {
  postId?: string;
  title: string;
  description: string;
  date: string;
  author: Author;
  tagList: string[];
  slugifySlug: string;
  blogType: string;
}

const loadLanguageChoices = Object.keys(LANGUAGE_LIST);

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

function formatDate(date: Date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

const getAuthorList = async () => {
  const rs: Author[] = [];
  const slugQuery = query(authorCol);
  const snaps = await getDocs(slugQuery);

  snaps.docs.forEach((r) => {
    rs.push(r.data());
  });

  return rs;
};

module.exports = (plop: NodePlopAPI) => {
  plop.setWelcomeMessage(
    "This utility is a helper to create converged Mdx post"
  );

  plop.setGenerator("create", {
    description: "Create new MDX post",
    prompts: async (inquirer): Promise<inquirerAnswer> => {
      // add plugin
      inquirer.registerPrompt("search-list", inquirerSearchList);

      let { blogType } = await inquirer.prompt<{ blogType: BlogType }>({
        type: "search-list" as any,
        name: "blogType",
        message: "Select blog type",
        default: "story",
        choices: [...BlogTypeArr],
      });

      let authorQues = await inquirer.prompt<{
        isNewAuthor: string;
        auNickName: string;
        auName: string;
        auDescription: string;
      }>([
        {
          type: "list",
          name: "isNewAuthor",
          message: "Is new author ?",
          default: "no",
          choices: ["yes", "no"],
        },
        {
          type: "input",
          name: "auNickName",
          message: "Unique nick name",
          default: `Mimikyu-${Date.now()}`,
          validate: async (input: string) => {
            const nickNameQuery = query(
              authorCol,
              where("nickName", "==", input),
              limit(1)
            );
            const snaps = await getDocs(nickNameQuery);

            if (snaps.empty) {
              return true;
            }

            return "This nick name was exist, please choose another 🤌";
          },
          when(answers) {
            return answers.isNewAuthor === "yes";
          },
        },
        {
          type: "input",
          name: "auName",
          message: "Your name",
          default: `User ${Date.now()}`,
          validate: (input: string) => !!input || "Must enter your name",
          when(answers) {
            return answers.isNewAuthor === "yes";
          },
        },
        {
          type: "input",
          name: "auDescription",
          message: "Some description",
          default: `I'm the best in the word`,
          validate: (input: string) => !!input || "Must enter your description",
          when(answers) {
            return answers.isNewAuthor === "yes";
          },
        },
      ]);

      if (authorQues.isNewAuthor == "yes") {
        const id = parseInt(nextId("author"));
        const newAuthor: Author = {
          id,
          name: authorQues.auName,
          nickName: authorQues.auNickName,
          description: authorQues.auDescription,
          url: "",
        };

        //  push to firestore
        const authorDocRef = doc(authorCol, `${id}`);

        await setDoc(authorDocRef, newAuthor, { merge: true });
      }

      const authorList = await getAuthorList();

      let { author } = await inquirer.prompt<{ author: Author }>({
        type: "search-list" as any,
        message: "Select author",
        name: "author",
        choices: authorList.map((au) => ({
          name: au.nickName,
          value: au,
        })),
      });

      console.log(`👉 ${author.nickName}`);

      let { slug } = await inquirer.prompt<{ slug: boolean }>({
        type: "input",
        name: "slug",
        message: "Enter unique slug",
        default: `Fake slug`,
        transformer(input, answers, flags) {
          return slugify(input);
        },
        validate: async (input: string) => {
          if (input.length < 5) {
            return "length must > 5";
          }

          const slugQuery = query(
            postCol,
            where("frontmatter.slugify", "==", input),
            limit(1)
          );
          const snaps = await getDocs(slugQuery);

          if (snaps.empty) {
            return true;
          }

          return "This slug was exist, please choose another 🤌";
        },
        filter(input) {
          return `${slugify(input)}-${Date.now()}`;
        },
      });

      let { date } = await inquirer.prompt<{ date: string }>({
        type: "input",
        name: "date",
        message: "Creation date (ex: 06/09/2069)",
        default: formatDate(new Date()),
        validate: (input: string) =>
          /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(
            input
          ) || "Must enter valid date dd/mm/yyyy",
      });

      let { title } = await inquirer.prompt<{ title: string }>({
        type: "input",
        name: "title",
        message: "Title",
        default: "mimikyu is the best pokemon",
        validate: (input: string) => !!input || "Must enter a title",
      });

      let { description } = await inquirer.prompt<{ description: string }>({
        type: "input",
        name: "description",
        message: "Description",
        default: "This is my first blog",
        validate: (input: string) => !!input || "Must enter a description",
      });

      let { tags } = await inquirer.prompt<{ tags: string[] }>({
        type: "input",
        name: "tags",
        message: "tag",
        default: "react",
        validate: (input: string) => !!input || "Must enter a tag",
        filter(input: string) {
          return input.trim().split(" ");
        },
      });

      return {
        blogType,
        author,
        slug,
        date,
        title,
        description,
        tags,
      };
    },
    actions: (answers) => {
      const { tags, slug, author, blogType, ...rest } =
        answers as CreateAnswers;
      const id = nextId("blog", author.id);
      const slugifySlug = `${slug}`;
      const data: CreateData = {
        ...rest,
        blogType,
        author,
        tagList: tags,
        slugifySlug,
      };

      data.postId = id;
      console.log(data);

      return [
        {
          type: "addMany",
          destination: `${root}/content/{{blogType}}/{{slugifySlug}}/{{language}}/`,
          templateFiles: "./plop-templates/index.mdx.hbs",
          data,
          skipIfExists: true,
          abortOnFail: true,
        },
        () => "Blog generate successfully!",
      ];
    },
  });
};
