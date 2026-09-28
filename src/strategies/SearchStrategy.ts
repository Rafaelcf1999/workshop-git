import type Book from '../entities/Book.ts';

export default interface SearchStrategy {
  search(value: string, books: Book[]): Book[];
}
