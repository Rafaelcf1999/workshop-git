import { Book } from "../entities/book.entity.ts";
import type { IBookRepository } from "./interfaces/book.interface.ts";

export class BookRepository implements IBookRepository {
  private saveBook = new Map<number, Book>();

  save(book: Book): void {
    if (this.saveBook.has(book.id)) throw Error("Book with this ID registered");

    this.saveBook.set(book.id, book);
  }

  findById(bookId: number): Book {
    const book = this.saveBook.get(bookId);

    if (!book) throw Error("Book not found");

    return book;
  }

  findAll(): Readonly<Book[]> {
    if (Array.from(this.saveBook.values()).length === 0)
      throw Error("No books registered");

    return Array.from(this.saveBook.values());
  }
}
