import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class SearchAuthor implements SearchStrategy {

    public search(books: Book[], term: string): Book[] {
        if (!term) {
            console.error("Termo de busca não pode ser vazio");
            return [];
        }
       return books.filter((book) => book.author.toLowerCase().includes(term.toLowerCase()));
    }
}