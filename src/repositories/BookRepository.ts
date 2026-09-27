import type { IBookRepository } from "./interfaces/IBookRepository.ts";
import { Book } from "../entities/Book.ts";

export class BookRepository implements IBookRepository{
    private books = new Map<number, Book>();

    save(book: Book): void {
        if(this.books.has(book.id)){
            throw new Error(`The ID: "${book.id}" already exists`);
        }
        this.books.set(book.id, book);
    }

    findById(id: number): Book {
        const book = this.books.get(id);
        if(!book){
            throw new Error("Book not found");
        }
        return book; 
    }

    findAll(): Book[] {
        if(this.books.size === 0){
            throw new Error("Books not found");
        }
        return Array.from(this.books.values());
    }
}