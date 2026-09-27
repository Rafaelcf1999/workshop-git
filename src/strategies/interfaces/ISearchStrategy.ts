import Book from "../../entities/Book.ts";

export interface ISearchStrategy {

    search(books: Book[]): Book[]

}

