import type { Book } from "../entities/Book.ts";

export interface SearchStrategy {
    search(book: Book[]): Book[];
}