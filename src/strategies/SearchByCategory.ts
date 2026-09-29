import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByCategory implements SearchStrategy {
  private category: string;

  constructor(category: string) {
    this.category = category;
  }

  public search(books: Book[]): Book[] {
    return books.filter(
      (book) => book.category.toLowerCase() === this.category.toLowerCase()
    );
  }
}
