import type { Book } from "../entities/Book.js";
import type { SearchStrategy } from "./SearchStrategy.js";

export class SearchByAuthor implements SearchStrategy {
  public search(books: Book[], query: string): Book[] {
    return books.filter(
      (book) => book.author.toLowerCase() === query.toLowerCase(),
    );
  }
}
