import type { Book } from "../entities/Book.js";
import type { SearchStrategy } from "./SearchStrategy.js";

export class SearchByCategory implements SearchStrategy {
  public search(books: Book[], query: string): Book[] {
    return books.filter(
      (book) => book.category.toLowerCase() === query.toLowerCase(),
    );
  }
}
