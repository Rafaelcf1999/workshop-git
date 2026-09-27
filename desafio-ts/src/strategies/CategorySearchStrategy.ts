import type Book from "../entities/Book.ts";
import type SearchStrategy from "./SearchStrategy.ts";

export default class CategorySearchStrategy implements SearchStrategy {
    search(books: Book[], value: string): Book[] {
        return books.filter(book => book.category === value);
    }

}