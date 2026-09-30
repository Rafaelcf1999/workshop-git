import { Book } from "../entities/Book";
import { SearchStrategy } from "./SearchStrategy";

export class SearchByAuthor implements SearchStrategy {

    constructor(private readonly author: string) {}

    search(books: Book[]): Book[] {
        return books.filter((book) => book.author.toLowerCase() === this.author.toLowerCase(),);
    }
    
}