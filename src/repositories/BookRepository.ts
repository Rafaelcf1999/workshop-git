import { Book } from '../entities/Book.ts';
import type { IBookRepository } from './interfaces/IBookRepository.ts';

export class BookRepository implements IBookRepository {
  private books: Map<number, Book> = new Map();

  // lança erro se já existir um livro com o mesmo id.
  save(book: Book): void {
    if (this.books.has(book.id)) {
      throw new Error(`Livro com o id ${book.id} já existe.`);
    }
    this.books.set(book.id, book);
  }

  //lança erro se o livro não for encontrado.
  findById(id: number): Book {
    const book = this.books.get(id);
    if (!book) {
      throw new Error(`Livro com o id ${id} não encontrado.`);
    }
    return book;
  }

  //lança erro se não houver livros cadastrados.
  findAll(): Book[] {
    if (this.books.size === 0) {
      throw new Error('Não há livros cadastrados.');
    }
    return Array.from(this.books.values());
  }
}
