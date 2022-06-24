import { authors } from './authors';

/** Return author info, */
export function getAuthor(author: string) {
  const person = authors[author as keyof typeof authors];
  if (!person) {
    console.warn('Invalid author. Did you add it to authors.json??');
    return {
      name: 'Poro Team',
      url: 'https://facebook.com/poro.coding',
      id: 6666,
    };
  }

  return person;
}
