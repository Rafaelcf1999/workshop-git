import Book from "../entities/Book.ts";
import type SearchStrategy from "./SearchStrategy.ts";

export default class SearchAuthor implements SearchStrategy{
    search(books: Book[], info: string): Book[] {
        const found = books.filter(b => b.author.toUpperCase() === info.toUpperCase());
        if(found.length === 0){
            throw new Error("Author not found");
        }
        return found;
    }

}