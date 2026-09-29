import type Book from '../entities/Book.ts';
import type SearchStrategy from './SearchStrategy.ts';

export default class SearchByCategory implements SearchStrategy {
  search(books: Book[], query: string): Book[] {
    const result: Book[] = [];
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      if (book.category.toLowerCase() === query.toLowerCase()) {
        result.push(book);
      }
    }
    return result;
  }
}