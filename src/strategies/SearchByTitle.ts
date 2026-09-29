import type Book from "../entities/Book.ts";
import type ISearchStrategy from "./interfaces/ISearchStrategy.ts";

export default class SearchbyTitle implements ISearchStrategy{
    search(title: string, books: Map<number, Book>): Book[] {
        const foundTitle: Book[] = [];
        
        for (let book of books.values()){
            if (book.title.toLowerCase() === title.toLowerCase()){
                foundTitle.push(book);
            }
        }
        if(foundTitle.length > 0){
            return foundTitle;
        }    
        throw new Error("Title not found");
    }
}
