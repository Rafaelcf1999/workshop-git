import Book from "../entities/Book";
import SearchStrategy from "./SearchStrategy";

export default class SearchAuthorStrategy implements SearchStrategy {

    constructor(private readonly author:string) {}

    filtrar(books: Book[]): Book[] {
        return books.filter((books) => books.author === this.author)
    }

}

