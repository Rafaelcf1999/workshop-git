import { Book } from "../entities/Book";
import { SearcheStrategy } from "./SearchStrategy";

export class SearchByAuthor implements SearcheStrategy {

    constructor(private readonly author: string) {}

    search(books: Book[]): Book[] {
        return books.filter((book) => book.author.toLowerCase() === this.author.toLowerCase(),);
    }
    
}