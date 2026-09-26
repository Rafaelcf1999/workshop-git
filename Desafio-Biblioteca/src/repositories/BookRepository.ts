import Book from "../entities/Book.ts";
import type IBookRepository from "./interfaces/IBookRepository.ts";

export default class BookRepository implements IBookRepository {

    public books = new Map<number, Book>();


    save(book: Book): void {
        for (let [bookid] of this.books) {
            if (bookid === book.id) {
                console.error(`Um livro com o ID ${book.id} já está cadastrado no sistema.`)
            }

        }
        
        this.books.set(book.id, book);
    }

    findById(id: number) {
        for (let [bookid] of this.books) {
            if (bookid === id) {
                return this.books.get(id);
            }
        }

        console.error(`Não há um livro cadastrado com o ID ${id}.`);
    }

    findAll(): void {
        for (let book of this.books) {
            console.log(book)
        }
    }
}