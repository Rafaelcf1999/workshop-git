import type IBookRepository from "./interfaces/IBookRepository.ts";
import type Book from "../entities/Book.ts";

export default class BookRepository implements IBookRepository {

    private readonly books = new Map<number, Book>();

    save(book: Book): void {
        if(this.books.has(book.id)) {
            throw new Error (`Já existe um livro com o id ${book.id}!`)
        }
        this.books.set(book.id, book);
    }

    findById(id: number): Book {
        const book = this.books.get(id)

        if(book === undefined){
            throw new Error (`O livro do id ${id} não foi encontrado`)
        }

        return book
    }

    findAll(): Array<Book> {
        if(this.books.size === 0){
            throw new Error("Nenhum livro cadastrado")
        }
        return Array.from(this.books.values())
    }
}