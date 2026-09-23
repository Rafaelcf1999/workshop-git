import { Book } from "../entities/Book.ts";
import type { IBookRepository } from "./interfaces/IBookRepository.ts";

export class BookRepository implements IBookRepository {
  private repository = new Map<number, Book>();

  save(book: Book): void {
    if (this.repository.has(book.id)) {
      throw new Error(
        `Livro de ID número ${book.id} já existe no repositório.`,
      );
    }

    this.repository.set(book.id, book);
  }

  findById(id: number): Book {
    const bookById = this.repository.get(id);

    if (!bookById) {
      throw new Error(`Livro de ID número ${id} não encontrado.`);
    }

    return bookById;
  }

  findAll(): Book[] {
    return [...this.repository.values()];
  }
}
