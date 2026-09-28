import { Book } from "../entities/Book.js";
import type { BookSearch } from "./interfaces/IBookSearchStrategy.js";

export class SearchByCategoryStrategy implements BookSearch{
    private category: string
    constructor(category: string){
        this.category = category
    }
    search(books: Book[]): Book[] {
        // throw new Error("Method not implemented.");
        return books.filter(book => book.author === this.category)
    }
}