//permite a buca por autor, vinda de SearchStrategy

import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByAuthorStrategy implements SearchStrategy {
    public search(books: Book[], term: string): Book[] {
        return books.filter(book => book.author.toLowerCase() === term.toLowerCase());
    }
}