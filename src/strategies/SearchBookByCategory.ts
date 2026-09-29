import Book from "../entities/Book.ts";
import type IBookSearchStrategy from "./interfaces/IBookSearchStrategy.ts";

export default class SearchBookByCategory implements IBookSearchStrategy{

    search(books: Book[], query: string): Book[] {

        return books.filter(book => book.category.toLowerCase().includes(query.toLowerCase()));
    }
}