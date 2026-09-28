import { Book } from "../entities/Book.ts";
import type { IBookRepository } from "./interfaces/IBookRepository.ts";

export class BookRepository implements IBookRepository {
  private books: Map<number, Book> = new Map();

  save(book: Book): void {
    if (this.books.has(book.id)) {
      throw new Error(`Book with id ${book.id} already exists`);
    }
    this.books.set(book.id, book);
  }

  findById(id: number): Book {
    const book = this.books.get(id);
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  }

  findAll(): Book[] {
    if (this.books.size === 0) {
      throw new Error("No books registered");
    }
    return Array.from(this.books.values());
  }
}
