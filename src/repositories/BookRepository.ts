import type { Book } from "../entities/Book.ts";
import type { IBookRepository } from "./interfaces/IBookRepository.ts";

export class BookRepository implements IBookRepository{

    private books = new Map<number, Book>()
    save(book: Book): void {
        if (this.books.has(book.id)) {
            throw new Error("livro ja existe.");
        }
        this.books.set(book.id, book);
    }

    findById(id: number): Book {
        const book = this.books.get(id)
        if (!book) {
            throw new Error("livro não existe.");
        }
        return book;
    }
    findAll(): Book[] {
        if (this.books.size === 0) {
            throw new Error("sem livros registrados.");
        }
        return Array.from(this.books.values())
    } 
}