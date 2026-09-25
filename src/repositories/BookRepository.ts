/*
Armazene os livros em um Map<number, Book>, usando o id como chave.
save: lança erro se já existir um livro com o mesmo id.
findById: lança erro se o livro não for encontrado.
findAll: lança erro se não houver livros cadastrados.
*/
import{Book} from "../entities/Book.ts";
import type {IBookRepository} from "./interfaces/IBookRepository.ts"

export class BookRepository implements IBookRepository {
  private readonly books: Map<number, Book> = new Map();

  public save(book: Book): void {
    if (this.books.has(book.id)) {
      throw new Error(`Livro com id ${book.id} ja existe`);
    }
    this.books.set(book.id, book);
  }

  public findById(id: number): Book {
    const book = this.books.get(id);
    if (!book) {
      throw new Error(`Livro com id ${id} nao encontrado`);
    }
    return book;
  }

  public findAll(): Book[] {
    if (this.books.size === 0) {
      throw new Error("Nao ha livros registrados");
    }
    return Array.from(this.books.values());
  }
}
