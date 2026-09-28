import { Book } from "../entities/Book.js";
import type { BookSearch } from "./interfaces/IBookSearchStrategy.js";

export class SearchByAuthorStrategy implements BookSearch{
    private author: string
    constructor(author: string){
        this.author = author
    }
    search(books: Book[]): Book[] {
        // throw new Error("Method not implemented.");
        return books.filter(book => book.author === this.author)
    }
}