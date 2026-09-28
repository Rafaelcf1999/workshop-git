import { Book } from "../entities/Book.ts";
import type { IBookRepository } from "./interfaces/IBookRepository.ts";

export class BookRepository implements IBookRepository {
    public books: Map<number, Book> = new Map<number, Book>();

    public save(book: Book): void {
        
        if (this.books.has(book.id)) {
            throw new Error("O livro já existe");
        }
        this.books.set(book.id, book);
    }
    public findById(id: number): Book {
        const book = this.books.get(id)
        if (!book){
            throw new Error("Livro não encontrado")
        }
        return book;
    }
    public findAll(): Book[] {
        if (this.books.size === 0) {
            throw new Error("Nenhum livro cadastrado");
        }
        return Array.from(this.books.values());
    }   

}