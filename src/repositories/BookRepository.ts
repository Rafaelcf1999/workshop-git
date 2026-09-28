import Book from '../entities/Book';
import IBookRepository from './interfaces/IBookRepository';

export default class BookRepository implements IBookRepository {
  private books = new Map<number, Book>();

  save(book: Book): void {
    if (this.books.has(book.id)) {
      throw new Error("Book already exists");
    }
    this.books.set(book.id, book);
  }

  findById(id: number): Book {
    const bookById = this.books.get(id);
    if (!bookById) {
      throw new Error("Book not found");
    }
    return bookById;
  }

  findAll(): Book[] {
    if (this.books.size === 0) {
      throw new Error("No books found");
    }
    return Array.from(this.books.values());
  }
}