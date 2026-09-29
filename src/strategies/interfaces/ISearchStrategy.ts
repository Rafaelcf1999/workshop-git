import type Book from "../../entities/Book.ts";

export default interface SearchStrategy{
    search(search: string, books: Map<number, Book>): Book[];
}
