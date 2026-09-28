import { Book } from "../../entities/book.entity.ts";

export interface IBookRepository {
  save(book: Book): void;
  findById(bookId: number): Book;
  findAll(): Book[];
}
