import type Book from '../entities/Book.ts';
import type SearchStrategy from './SearchStrategy.ts';

export default class SearchByAuthor implements SearchStrategy {
  search(value: string, books: Book[]): Book[] {
    return books.filter((ev) => ev.author === value);
  }
}
