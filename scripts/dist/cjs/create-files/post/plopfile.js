"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAuthor_1 = require("./getAuthor");
const index_1 = require("../../monorepo/index");
const slugify_1 = require("../../slugify");
const index_2 = require("../../uuid/index");
const authors_1 = require("../../mdx/authors");
const root = index_1.findGitRoot();
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
    return Object.keys(authors_1.authors);
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
            const _a = answers, { categories, author, keywords } = _a, rest = __rest(_a, ["categories", "author", "keywords"]);
            const slugifyTitle = slugify_1.slugify(answers.title);
            const data = Object.assign(Object.assign({}, rest), { authorDetail: getAuthor_1.getAuthor(answers.author), categoryList: answers.categories.trim().split(" "), keywordList: answers.keywords.trim().split(" "), slugifyTitle });
            data.postId = index_2.nextId(data.authorDetail.id);
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
