import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByCategory implements SearchStrategy{
    search(books: Book[], term: string): Book[] {
        return books.filter(x => x.category.toLowerCase().includes(term.toLowerCase()));
    }
}