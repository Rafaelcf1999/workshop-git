//permite busca por categoria, vinda de SearchStrategy

import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchByCategoryStrategy implements SearchStrategy {
    public search(books: Book[], term: string): Book[] {
        return books.filter(book => book.category.toLowerCase() === term.toLowerCase());
    }
}