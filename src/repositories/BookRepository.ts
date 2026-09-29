import { Book } from "../entities/Book.ts";
import type { IBookRepository } from "./interfaces/IBookRepository.ts";

/**
 * Repositório em memória para gestão de livros utilizando estrutura Map.
 */
export class BookRepository implements IBookRepository {
  private books: Map<number, Book> = new Map<number, Book>();

  /**
   * Salva um novo livro no repositório.
   * @throws {Error} Se já existir um livro com o mesmo id.
   */
  public save(book: Book): void {
    if (this.books.has(book.id)) {
      throw new Error(`Book with ID ${book.id} already exists.`);
    }
    this.books.set(book.id, book);
  }

  /**
   * Busca um livro pelo seu identificador único.
   * @throws {Error} Se o livro não for encontrado.
   */
  public findById(id: number): Book {
    const book = this.books.get(id);
    if (!book) {
      throw new Error(`Book with ID ${id} not found.`);
    }
    return book;
  }

  /**
   * Retorna a lista de todos os livros cadastrados.
   * @throws {Error} Se não houver livros cadastrados.
   */
  public findAll(): Book[] {
    if (this.books.size === 0) {
      throw new Error("No books registered.");
    }
    return Array.from(this.books.values());
  }
}
