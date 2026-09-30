import { Book } from "../entities/Book";
import { SearcheStrategy } from "./SearchStrategy";

export class SearchByCategory implements SearcheStrategy {
  constructor(private readonly category: string) {}

  search(books: Book[]): Book[] {
    return books.filter(
      (book) => book.category.toLowerCase() === this.category.toLowerCase(),
    );
  }
}