import type { Book } from "../entities/Book.ts";

export interface SearchStrategy {
  search(books: Book[], searchTerm: string): Book[];
}
