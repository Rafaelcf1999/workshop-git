import Book from "../entities/Book.ts";
import type IBookRepository from "./interfaces/IBookRepository.ts";

export default class BookRepository implements IBookRepository {

    private books = new Map<number, Book>();


    save(book: Book): boolean {
       
        if(this.books.has(book.id)){
            console.error()
            throw new Error(`Um livro com o ID ${book.id} já está cadastrado no sistema.`);
        }
        
        this.books.set(book.id, book);
        return true;
    }

    findById(id: number)  {

        const book = this.books.get(id);
        
        if(!book){
            throw new Error(`Livro com o ID ${id} não encontrado.`);
        }

        return book;
    }

    findAll(): Book[] {
        return Array.from(this.books.values());
    }
}