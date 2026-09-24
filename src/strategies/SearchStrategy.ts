import type Book from "../entities/Book.ts";

export default interface SearchStrategy {
    filtrar(books: Book[]): Book[];
}