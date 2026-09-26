import type { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByCategoryStrategy implements SearchStrategy {
  public search(books: Book[], searchTerm: string): Book[] {
    const normalizedSearchTerm = searchTerm.toLowerCase();

    return books.filter((book) =>
      book.category.toLowerCase().includes(normalizedSearchTerm),
    );
  }
}
