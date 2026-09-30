import { Book } from "../entities/Book";

export interface SearchStrategy {
    search(book: Book[]): Book[];
}