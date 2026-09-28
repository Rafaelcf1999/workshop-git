import type { Book } from "../entities/Book";

export interface SearchStrategy {
  search(books: Readonly<Book[]>, query: string): Book[];
}
