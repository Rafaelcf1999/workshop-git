import {Book} from "../../entities/Book.js";

export default interface IBookRepository {
    
    save(book: Book): void;
    findById(id: number): Book;
    findAll(): Book[]
    
}