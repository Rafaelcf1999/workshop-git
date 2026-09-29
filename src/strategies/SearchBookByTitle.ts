import Book from "../entities/Book.ts";
import type IBookSearchStrategy from "./interfaces/IBookSearchStrategy.ts";

export default class SearchBookByTitle implements IBookSearchStrategy{
    search(books: Book[], query: string): Book[] {

        return books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
    }
}