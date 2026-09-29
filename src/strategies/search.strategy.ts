import { Book } from "../entities/book.entity.ts";

export interface SearchStrategy {
  search(books: Readonly<Book[]>, keyword: string): Book[];
}
