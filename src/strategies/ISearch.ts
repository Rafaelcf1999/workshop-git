import { Book } from '../entities/Book.js';

export default interface SearchStrategy {
  search(books: Book[], query: string): Book[];
}