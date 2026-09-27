import type Book from "../entities/Book.ts";
import type SearchStrategy from "./interfaces/SearchStrategy.ts";

export default class SearchByCategory implements SearchStrategy {
    search(books: Book[], term: string): Book[] {
        return books.filter(book => book.category.toLowerCase().includes(term.toLowerCase()));
    }
}