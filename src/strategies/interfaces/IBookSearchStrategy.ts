import Book from "../../entities/Book.ts";

export default interface IBookSearchStrategy{
    search(books: Book[], query: string): Book[];
}