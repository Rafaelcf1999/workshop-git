import type { Book } from "../entities/Book.ts";
import type { IBookRepository } from "./interfaces/IBookRepository.ts";

export class BookRepository implements IBookRepository {

    private books: Map<number, Book> = new Map();

    save(book: Book): void {
        if(this.books.has(book.id)) {
            throw new Error("Livro já cadastrado.");
        }
        this.books.set(book.id, book);
    }

    findById(id: number): Book {
        const book = this.books.get(id);
        if(!book) {
            throw new Error("Livro não encontrado.");
        }
        return book;
    }

    findAll(): Book[] {
        if(this.books.size === 0) {
            throw new Error("Nenhum livro cadastrado.");
        }
        return Array.from(this.books.values());
    }
}