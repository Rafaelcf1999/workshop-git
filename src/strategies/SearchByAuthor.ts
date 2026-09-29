import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByAuthor implements SearchStrategy{
    search(books: Book[], term: string): Book[] {
        return books.filter(x => x.author.toLowerCase().includes(term.toLowerCase()));
    }
}