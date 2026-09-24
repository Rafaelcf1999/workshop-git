import Book from "../entities/Book";
import IBookRepository from "./interfaces/IBookRepository";

export default class BookRepository implements IBookRepository{

    save(book: Book): void {
        
    }

    findById(id: number){
        
    }

    findAll(): void {
        
    }

    
}