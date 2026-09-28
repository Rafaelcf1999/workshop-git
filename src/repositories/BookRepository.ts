import type { Book } from "../entities/Book.ts";
import type { IBookRepository } from "./interfaces/IBookRepository.ts";

export class BookRepository implements IBookRepository {
  private books = new Map<number, Book>();

  public save(book: Book): void {
    if (this.books.has(book.id)) {
      throw new Error("Book already exists");
    }

    this.books.set(book.id, book);
  }

  public findById(id: number): Book {
    const book = this.books.get(id);

    if (!book) {
      throw new Error("Book not found");
    }

    return book;
  }

  public findAll(): Book[] {
    if (this.books.size === 0) {
      throw new Error("No books registered");
    }

    return [...this.books.values()];
  }
}
