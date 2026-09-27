import Book from "../entities/Book.ts";
import type { ISearchStrategy } from "./interfaces/ISearchStrategy.ts";

class SerachByAuthor implements ISearchStrategy {

    constructor(private readonly author: string){

    }

    search(books: Book[]): Book[] {
       return books.filter((books) => books.author.toLowerCase() === this.author.toLowerCase())
    }
    
}

export default SerachByAuthor;