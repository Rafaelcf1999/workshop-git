import type Book from '../entities/Book.ts';
import type SearchStrategy from './SearchStrategy.ts';

export default class SearchByCategory implements SearchStrategy {
  search(value: string, books: Book[]): Book[] {
    return books.filter((ev) => ev.category === value);
  }
}
