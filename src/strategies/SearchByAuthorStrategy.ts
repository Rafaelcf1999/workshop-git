import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByAuthorStrategy implements SearchStrategy {
    private author: string;

    constructor(author: string) {
      this.author = author;
    }

    public search(books: Book[]): Book[] {
      return books.filter(book => book.author.toLowerCase().includes(this.author.toLowerCase()));
    }
  }