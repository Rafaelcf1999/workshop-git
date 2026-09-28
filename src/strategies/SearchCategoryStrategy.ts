import type SearchStrategy from "./SearchStrategy.ts";
import type Book from "../entities/Book.ts";

export default class SearchCategoryStrategy implements SearchStrategy {

    constructor(private readonly category: string) {
    }
    search(books: Book[]): Book[] {
        return books.filter((books) => books.category === this.category)
    }

}