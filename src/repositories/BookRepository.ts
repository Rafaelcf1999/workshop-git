import Book from "../entities/Book.ts";
import type IBookRepository from "./interfaces/IBookRepository.ts";

export default class BookRepository implements IBookRepository {
    
    private books: Map<number, Book> = new Map<number, Book>();
    
    save(objectToSave: Book): Book {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Book | null {
        throw new Error("Method not implemented.");
    }
    findAll(): Book[] {
        throw new Error("Method not implemented.");
    }
}
