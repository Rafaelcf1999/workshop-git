import type Book from "../entities/Book.ts";
import type SearchStrategy from "./SearchStrategy.ts";

export default class SearchAuthorStrategy implements SearchStrategy {

    constructor(private readonly author:string) {}

    search(books: Book[]): Book[] {
        return books.filter((books) => books.author === this.author)
    }

}

