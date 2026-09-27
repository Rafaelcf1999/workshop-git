import Book from "../entities/Book.ts";
import type IBookRepository from "./interfaces/IBookRepository.ts";

export default class BookRepository implements IBookRepository {

    public books = new Map<number, Book>();


    save(book: Book): boolean {
        /*for (let [bookid] of this.books) {
            if (bookid === book.id) {
                return false;
            }
 
        }*/
       
        if(this.books.has(book.id)){
            return false;
        }
        
        this.books.set(book.id, book);
        return true;
    }

    findById(id: number)  {
        /*for (let [bookid] of this.books) {
            if (bookid === id) {
                return this.books.get(id);
            }
        }*/

        if(!this.books.has(id)){
            return undefined;
        }

        return this.books.get(id);
    }

    findAll(): Book[] {
        return Array.from(this.books.values());
    }
}