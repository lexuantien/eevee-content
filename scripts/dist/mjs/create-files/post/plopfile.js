import { getAuthor } from "./getAuthor";
import { findGitRoot } from "../../monorepo/index";
import { slugify } from "../../slugify";
import { nextId } from "../../uuid/index";
import { authors } from "../../mdx/authors";
const root = findGitRoot();
function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}
function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join("/");
}
function getAuthorNicknameList() {
    return Object.keys(authors);
}
module.exports = (plop) => {
    plop.setWelcomeMessage("This utility is a helper to create converged Mdx post");
    plop.setGenerator("post", {
        description: "New Mdx post",
        prompts: [
            {
                type: "list",
                name: "postType",
                message: "Which post type do you want?",
                choices: ["stories", "diary"],
                validate: (packageName) => ["stories", "diary"].includes(packageName),
            },
            {
                type: "input",
                name: "title",
                message: "Title",
                default: "My first blog",
                validate: (input) => !!input || "Must enter a title",
            },
            {
                type: "input",
                name: "description",
                message: "Description",
                default: "This is my first blog",
                validate: (input) => !!input || "Must enter a description",
            },
            {
                type: "input",
                name: "date",
                message: "Creation date (ex: 06/09/2069)",
                default: formatDate(new Date()),
                validate: (input) => /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(input) || "Must enter valid date dd/mm/yyyy",
            },
            {
                type: "list",
                name: "author",
                message: "Author (ex: tienlx97)",
                choices: getAuthorNicknameList,
                validate: (author) => getAuthorNicknameList().includes(author) || "Must enter author",
            },
            {
                type: "input",
                name: "categories",
                message: "category",
                default: "react",
                validate: (input) => !!input || "Must enter a categories",
            },
            {
                type: "input",
                name: "keywords",
                message: "some keywords",
                default: "react typescript",
                validate: (input) => !!input || "Must enter a categories",
            },
        ],
        actions: (answers) => {
            const { categories, author, keywords, ...rest } = answers;
            const slugifyTitle = slugify(answers.title);
            const data = {
                ...rest,
                authorDetail: getAuthor(answers.author),
                categoryList: answers.categories.trim().split(" "),
                keywordList: answers.keywords.trim().split(" "),
                slugifyTitle,
            };
            data.postId = nextId(data.authorDetail.id);
            return [
                {
                    type: "addMany",
                    destination: `${root}/content/{{postType}}/{{slugifyTitle}}/`,
                    templateFiles: "./plop-templates/index.mdx.hbs",
                    data,
                    skipIfExists: true,
                },
                () => "Post generate successfully!",
            ];
        },
    });
};
