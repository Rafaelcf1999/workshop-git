import {Book} from "../entities/Book.ts";
import type {IBookRepository} from "./interfaces/IBookRepository.ts";

export class BookRepository implements IBookRepository {
    private books: Map<number, Book> = new Map();

    save(book: Book): void {
        if (this.books.has(book.id)) { // verifica o map, caso o o livro já exista, lança um erro
            throw new Error(`Book with id ${book.id} already exists.`);
        }
        this.books.set(book.id, book); // caso não exista, adiciona o livro ao map
    }

    findById(id: number): Book {
        const book = this.books.get(id);
        if (!book) { // verifica se o livro existe pelo id, caso não exista, lança um erro
            throw new Error(`Book with id ${id} not found.`);
        }
        return book;
    }

    findAll(): Book[] {
        if (this.books.size === 0) { // verifica se o map está vazio, caso esteja, lança um erro
            throw new Error("No books found.");
        }
        return Array.from(this.books.values()); // caso não esteja vazio, retorna todos os livros do map
    }
}