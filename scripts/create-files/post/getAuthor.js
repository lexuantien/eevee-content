import { authors } from "../../../authors";
/** Return author info, */
export function getAuthor(author) {
    const person = authors[author];
    if (!person) {
        console.warn("Invalid author. Did you add it to authors.json??");
        return authors.poro;
    }
    return person;
}
