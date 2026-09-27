import type { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByAuthorStrategy implements SearchStrategy{

    constructor(private readonly author: String){}

    public search(books: Book[]): Book[] {
        return books.filter(
            (book) => book.author.toLowerCase() === this.author.toLowerCase()
        );
    }
}