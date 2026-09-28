import { Book } from "../entities/Book.ts";
import type { IBookSearchStrategy } from "./interfaces/IBookSearchStrategy.ts";

export class SearchByCategoryStrategy implements IBookSearchStrategy{
    private category: string
    constructor(category: string){
        this.category = category
    }
    search(books: Book[]): Book[] {
        return books.filter(book => book.category === this.category)
    }
}