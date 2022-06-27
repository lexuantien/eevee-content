"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthor = void 0;
const authors_1 = require("../../mdx/authors");
/** Return author info, */
function getAuthor(author) {
    const person = authors_1.authors[author];
    if (!person) {
        console.warn("Invalid author. Did you add it to authors.json??");
        return authors_1.authors.poro;
    }
    return person;
}
exports.getAuthor = getAuthor;
