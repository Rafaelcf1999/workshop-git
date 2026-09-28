import Book from "../entities/Book.ts";
import type IBookRepository from "./interfaces/IBookRepository.ts";

export default class BookRepository implements IBookRepository {

    private books = new Map<number, Book>();


    save(book: Book): boolean {
       
        if(this.books.has(book.id)){
            console.error()
            throw new Error(`Book with ID ${book.id} already exists.`);
        }
        
        this.books.set(book.id, book);
        return true;
    }

    findById(id: number)  {

        const book = this.books.get(id);
        
        if(!book){
            throw new Error(`Book with ID ${id} not found.`);
        }

        return book;
    }

    findAll(): Book[] {
        return Array.from(this.books.values());
    }
}