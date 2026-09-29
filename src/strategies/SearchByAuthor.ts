import type Book from "../entities/Book.ts";
import type ISearchStrategy from "./interfaces/ISearchStrategy.ts";

export default class SearchByAuthor implements ISearchStrategy{
    search(author: string, books: Map<number, Book>): Book[] {
        const foundAuthors: Book[] = [];

        for (let book of books.values()){
            if (book.author.toLowerCase() === author.toLowerCase()){
                foundAuthors.push(book);
            }
        }

        if(foundAuthors.length > 0){
            return foundAuthors;
        }    
        throw new Error("Author not found");
    }
    
}
