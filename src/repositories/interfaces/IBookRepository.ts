import { Book } from "../../entities/Book.ts";

export interface IBookRepository{
    save(book: Book): void;
    findById(id: number): Book | undefined;
    findAll(): Book[];
}
