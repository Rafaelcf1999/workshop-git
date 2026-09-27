import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByAuthor implements SearchStrategy {
  search(books: Book[], criteria: string): Book[] {
    return books.filter((book) => book.author === criteria);
  }
}

