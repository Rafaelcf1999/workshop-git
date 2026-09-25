import type Book from "../entities/Book.ts";
import type SearchStrategy from "./SearchStrategy.ts";

export default class SearchByAuthor implements SearchStrategy<Book> { 
    search(items: Book[], term: string): Book[] {
        return items.filter(book => book.author.includes(term));
    }
}