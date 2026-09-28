import {Book} from "../entities/Book.js";
import type IBookRepository from "./interfaces/IBook.js";

export default class BookRepository implements IBookRepository {
    private books = new Map<number, Book>();


    save(book: Book): void {
        if(this.books.has(book.id)){
            throw new Error(`Livro com o ID ${book.id} cadastrado.`);    
        }
        this.books.set(book.id, book);
    }

    findById(id: number): Book {
        const foundBook = this.books.get(id);
        if(!foundBook){
            throw new Error(`livro não foi encontrado.`);  
        }
        
        return foundBook; 
    }

    findAll(): Book[] {
        if(this.books.size === 0){
            throw new Error("Nenhum livro cadastrado..");
            
        }
        return Array.from(this.books.values());
    }

}