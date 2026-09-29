import type Book from "../entities/Book.ts";
import type ISearchStrategy from "./interfaces/ISearchStrategy.ts";

export default class SearchbyCategory implements ISearchStrategy{
    search(category: string, books: Map<number, Book>): Book[] {
        const foundCategory: Book[] = [];
                
        for (let book of books.values()){
            if (book.category.toLowerCase() === category.toLowerCase()){
                foundCategory.push(book);
            }
        }
        if(foundCategory.length > 0){
            return foundCategory;
        }    
        throw new Error("Category not found");
    }
}
    
