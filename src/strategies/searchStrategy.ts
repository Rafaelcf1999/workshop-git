import { Book } from "../entities/Book.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";

export interface SearchStrategy{
    search(value: string): Book[];
}
export class SearchBookByAuthor implements SearchStrategy{
    constructor(
        protected books: IBookRepository
    ){}
    
    search(value: string): Book[] {
        let result: Book[] = [];
        for(let book of this.books.findAll()){
            if(book.author === value){
                result.push(book);
            }
        }
        return result;
    }
}
export class SearchBookByCategory implements SearchStrategy{
    constructor(
        protected books: IBookRepository
    ){}

    search(value: string): Book[] {
        let result: Book[] = [];
        for(let book of this.books.findAll()){
            if(book.category === value){
                result.push(book);
            }
        }
        return result;
    }
}