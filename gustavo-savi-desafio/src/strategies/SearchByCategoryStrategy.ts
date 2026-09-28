import type { Book } from "../entities/Book";
import type { SearchStrategy } from "./SearchStrategy";

export class SearchByCategoryStrategy implements SearchStrategy {
  search(books: Book[], query: string): Book[] {
    const clearQuery = query.trim().toLowerCase();

    return books.filter((book) =>
      book.category.toLowerCase().includes(clearQuery),
    );
  }
}
