import { Book } from "../entities/book.entity.ts";

export interface SearchStrategy {
  search(books: Book[], keyword: string): Book[];
}
