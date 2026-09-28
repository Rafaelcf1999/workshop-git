import { Book } from "../entities/Book.ts";
import type { IBookSearchStrategy } from "./interfaces/IBookSearchStrategy.ts";

export class SearchByAuthorStrategy implements IBookSearchStrategy{
    private author: string
    constructor(author: string){
        this.author = author
    }
    search(books: Book[]): Book[] {
        return books.filter(book => book.author === this.author)
    }
}