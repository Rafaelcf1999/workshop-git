import { Book } from "../entities/Book.ts";
import { SearchStrategy } from "./SearchStrategy.ts";

export class AuthorSearchStrategy implements SearchStrategy {
    constructor(private authorTerm: string) {}

    public search(books: Book[]): Book[] {
        return books.filter(book => book.author.toLowerCase().includes(this.authorTerm.toLowerCase()));
    }
}