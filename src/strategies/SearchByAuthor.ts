import type { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByAuthor implements SearchStrategy {

    constructor(private readonly author: string) {}

    search(books: Book[]): Book[] {
        return books.filter((book) => book.author.toLowerCase() === this.author.toLowerCase(),);
    }
    
}