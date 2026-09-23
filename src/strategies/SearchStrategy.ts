import { Book } from "../entities/Book";

export interface SearchStrategy {
  search(books: Book[]): void;
}
