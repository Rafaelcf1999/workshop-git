import type { Book } from "../../entities/Book.ts";

export interface IBookSearchStrategy{
    search(books: Book[]): Book[]
}