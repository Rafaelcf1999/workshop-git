import type Book from "../entities/Book.ts";
import type SearchStrategy from "./SearchStrategy.ts";

export default class SearchByCategory implements SearchStrategy<Book> {
    search(items: Book[], term: string): Book[] {
       return items.filter(book => book.category.includes(term));
    }
}