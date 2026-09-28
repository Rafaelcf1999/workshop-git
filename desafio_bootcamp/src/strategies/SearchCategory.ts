import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchCategory implements SearchStrategy {
    

    public search(books: Book[], term: string): Book[] {
        if (!term) {
            console.error("Termo de busca não pode ser vazio");
            return [];
        }
        return books.filter((book) => book.category.toLowerCase().includes(term.toLowerCase()));
    }
}