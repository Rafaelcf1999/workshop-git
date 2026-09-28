import type { Book } from "../../entities/Book.ts";

export interface IBookRepository {
  save(book: Book): void;
  findById(id: number): Readonly<Book>;
  findAll(): Readonly<Book[]>;
}
