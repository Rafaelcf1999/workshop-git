//armazena os livros em um Map<number, Book> tendo o id como chave
//save: lança erro se já existir um livro cadastrado com mesmo id
//findById: lança erro se o livro não for encontrado
//findAll: lança erro se não houver livros cadastrados

import { Book } from "../entities/Book.ts";
import type { IBookRepository } from "./interfaces/IBookRepository.ts";

export class BookRepository implements IBookRepository{
    private books: Map<number, Book> = new Map();

    public save(book: Book): void{
        if(this.books.has(book.id)){
            throw new Error(`Book with id ${book.id} already exists`);
        }
        this.books.set(book.id, book);
    }

    public findById(id: number): Book{
        const book = this.books.get(id);
        if(!book){
            throw new Error(`Book with id ${id} not found`);
        }
        return book;
    }

    public findAll(): Book[]{
        if(this.books.size === 0){
            throw new Error("No books registered");
        }
        return Array.from(this.books.values());
    }
}