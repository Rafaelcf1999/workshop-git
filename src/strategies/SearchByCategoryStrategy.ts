import type { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByCategoryStrategy implements SearchStrategy{

    constructor(private readonly category: String){}

    public search(books: Book[]): Book[] {
        return books.filter(
            (book) => book.category.toLowerCase() === this.category.toLowerCase()
        );
    }
}