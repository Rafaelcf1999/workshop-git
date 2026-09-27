import type { Book } from "../entities/Book.js";

export interface SearchStrategy {
  search(books: Book[], query: string): Book[];
}
