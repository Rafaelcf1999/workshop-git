import type { Book } from "../entities/Book";

export interface SearchStrategy {
  search(books: Readonly<Book[]>, query: string): Book[];
}

export class SearchByAuthorStrategy implements SearchStrategy {
  search(books: Readonly<Book[]>, query: string): Book[] {
    const clearQuery = query.trim().toLowerCase();

    return books.filter((book) =>
      book.author.toLowerCase().includes(clearQuery),
    );
  }
}

export class SearchByCategoryStrategy implements SearchStrategy {
  search(books: Book[], query: string): Book[] {
    const clearQuery = query.trim().toLowerCase();

    return books.filter((book) => book.category.includes(clearQuery));
  }
}
