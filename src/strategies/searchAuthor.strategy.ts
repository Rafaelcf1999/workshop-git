import { Book } from "../entities/book.entity.ts";
import type { SearchStrategy } from "./search.strategy.ts";

export class SearchAuthor implements SearchStrategy {
  search(books: Book[], keyword: string): Book[] {
    const filterBooks = books.filter((book) => book.author.includes(keyword));

    return filterBooks;
  }
}
