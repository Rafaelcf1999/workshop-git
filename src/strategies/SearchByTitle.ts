import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByTitle implements SearchStrategy {
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  public search(books: Book[]): Book[] {
    return books.filter(
      (book) => book.title.toLowerCase().includes(this.title.toLowerCase())
    );
  }
}
