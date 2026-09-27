import type Book from "../../entities/Book.ts";

export default interface IBookRepository {
    save(book: Book): void;
    findById(id: number): Book;
    findAll(): Book[];
}