import type { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class CategorySearchStrategy implements SearchStrategy {
  public search(books: Book[], query: string): Book[] {
    const term = query.trim().toLowerCase();
    return books.filter((book) => book.category.toLowerCase().includes(term));
  }
}
