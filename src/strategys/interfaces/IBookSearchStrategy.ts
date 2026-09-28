import type { Book } from "../../entities/Book.js";

export interface BookSearch{
    search(books: Book[]): Book[]
}