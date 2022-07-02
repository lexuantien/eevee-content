import { authors } from "./authors";

/** Return author info, */
export const getAuthor = (author: string) => {
  const person = authors[author as keyof typeof authors];
  if (!person) {
    console.warn("Invalid author. Did you add it to authors.json??");
    return authors.poro;
  }

  return person;
};
