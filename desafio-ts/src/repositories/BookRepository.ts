import Book from "../entities/Book.ts";
import type IBookRepository from "./interfaces/IBookRepository.ts";

export default class BookRepository implements IBookRepository {
    //Armazena os livros em um Map, usando ID como chave
    private books: Map<number, Book> = new Map();

    save(book: Book): void {
        if (this.books.has(book.id)) {
            throw new Error("Livro com mesmo ID já cadastrado.");
        }
        this.books.set(book.id, book);
    }
    findById(id: number): Book {
        const book = this.books.get(id);
        //Se não encontrar o livro?
        if (!book) {
            throw new Error("Livro não encontrado.");
        }
        //console.log(`Mostrando livro de ID: ${id}`)
        return book;
    }
    findAll(): Book[] {
        if (this.books.size === 0) {
            throw new Error("Não há livros cadastrados.");
        }
        //console.log("Mostrando Todos os Livros")
        return Array.from(this.books.values());

    }
    
}