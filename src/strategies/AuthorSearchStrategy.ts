import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class AuthorSearchStrategy implements SearchStrategy {
  public search(books: Book[], term: string): Book[] {
    return books.filter((book) =>
      book.author.toLowerCase().includes(term.toLowerCase())
    );
  }
}