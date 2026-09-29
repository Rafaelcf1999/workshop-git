import { Book } from '../entities/Book.ts';
import type { SearchStrategy } from './SearchStrategy.ts';

export class AuthorSearchStrategy implements SearchStrategy {
  search(books: Book[], query: string): Book[] {
    return books.filter((book) =>
      book.author.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
