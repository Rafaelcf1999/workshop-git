import Book from "../entities/Book.ts";
import IBookRepository from "./interfaces/IBookRepository.ts";

export default class BookRepository implements IBookRepository{

    private books: Map<number, Book> = new Map();

    public save(book: Book): void{
        this.books.set(book.id, book);
    }

    public findById(id: number): Book | undefined {
        return this.books.get(id);
    }

    public findAll(): Book[] {
        return Array.from(this.books.values());
    }
}