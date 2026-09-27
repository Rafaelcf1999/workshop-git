import Book from "../../entities/Book.ts";

export default interface IBookRepository{
    save(book: Book): boolean;
    findById(id: number): Book | undefined;
    findAll(): Book[];
}   