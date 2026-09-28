import type Book from "../entities/Book.ts";

export default interface SearchStrategy {
    search(books: Book[]): Book[];
}