import type { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByCategory implements SearchStrategy {
  constructor(private readonly category: string) {}

  search(books: Book[]): Book[] {
    return books.filter(
      (book) => book.category.toLowerCase() === this.category.toLowerCase(),
    );
  }
}