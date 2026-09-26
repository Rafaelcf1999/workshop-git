//apenas intrerface que deve permitir buscas extensíveis
//método search

import { Book } from "../entities/Book.ts";

export interface SearchStrategy {
    search(books: Book[], term: string): Book[];
}