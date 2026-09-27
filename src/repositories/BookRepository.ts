import { Book } from "../entities/Book.ts";
import type { IBookRepository } from "./interfaces/IBookRepository.ts";

export class BookRepository implements IBookRepository{
    private books: Map<number, Book>= new Map;

    public save(book: Book): void{
        if(this.books.has(book.id)){
            throw new Error(`O livro com ID ${book.id} já existe.`)  
        }
        this.books.set(book.id, book);
    }

    public findById(id: number): Book{
        const book = this.books.get(id);
        if(!book) {
            throw new Error(`O livro com ID ${id} não foi encontrado.`)
        }
        return book;
    }

    public findAll(): Book[] {
        if(this.books.size === 0){
            throw new Error("Não existe nenhum livro cadastrado.")
        }
        return Array.from(this.books.values())

    }
}
