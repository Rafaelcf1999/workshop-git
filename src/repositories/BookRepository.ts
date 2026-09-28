import type Book from '../entities/Book.ts';
import type { IBookRepository } from './interfaces/IBookRepository.ts';

export default class BookRepository implements IBookRepository {
  private readonly books = new Map<number, Book>();

  save(book: Book): void {
    if (this.books.has(book.id)) {
      throw new Error('You already have a book with this ID.');
    }
    this.books.set(book.id, book);
  }

  findById(id: number): Book {
    const book = this.books.get(id);
    if (book !== undefined) {
      return book;
    }
    throw new Error('There are no books with that ID.');
  }

  findAll(): Book[] {
    if (this.books.size > 0) {
      return Array.from(this.books.values());
    }
    throw new Error('Does not own any books.');
  }
}
