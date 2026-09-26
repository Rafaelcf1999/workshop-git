import Book from "../entities/Book.ts";

export default interface SearchStrategy{
    search(books: Book[], info: string): Book[];
}