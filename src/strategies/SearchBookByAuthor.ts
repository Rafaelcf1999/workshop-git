import Book from "../entities/Book.ts";
import IBookSearchStrategy from "./interfaces/IBookSearchStrategy.ts";

export default class SearchBookByAuthor implements IBookSearchStrategy{
    search(books: Book[], query: string): Book[] {
        
        return books.filter(book => book.author.toLowerCase().includes(query.toLowerCase()));
    }
}