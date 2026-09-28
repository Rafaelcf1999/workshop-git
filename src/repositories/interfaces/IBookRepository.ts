import { Book } from "../../entities/book";

export interface IBookRepository {
    save(book: Book): void;
    findById(id: number): Book;
    findAll(): Book[];
}