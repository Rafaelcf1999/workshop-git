import { Book } from "../entities/Book";
import { SearchStrategy } from "./SearchStrategy";

export class SearchByCategory implements SearchStrategy {
  constructor(private readonly category: string) {}

  search(books: Book[]): Book[] {
    return books.filter(
      (book) => book.category.toLowerCase() === this.category.toLowerCase(),
    );
  }
}