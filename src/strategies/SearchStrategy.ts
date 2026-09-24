import Book from "../entities/Book";

export default interface SearchStrategy {
    filtrar(books: Book[]): Book[];
}