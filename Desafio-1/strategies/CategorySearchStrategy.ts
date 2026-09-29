import { Book } from "../entities/Book.ts";
import { SearchStrategy } from "./SearchStrategy.ts";

export class CategorySearchStrategy implements SearchStrategy {
    constructor(private categoryTerm: string) {}

    public search(books: Book[]): Book[] {
        return books.filter(book => book.category.toLowerCase() === this.categoryTerm.toLowerCase());
    }
}