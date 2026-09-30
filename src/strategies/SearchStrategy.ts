import { Book } from "../entities/Book";

export interface SearcheStrategy {
    search(book: Book[]): Book[];
}