import {Book} from "../entities/Book.ts";
import type { IBookRepository } from "./interfaces/IBookRepository.ts";



export class BookRepository implements IBookRepository {
    private books = new Map<number, Book>();

    save(book: Book): void {
        
        if (this.books.has(book.id)){
            throw Error("Esse livro já esta cadastrado");
        } this.books.set(book.id, book);
    }

    findById (id: number): Book{
    
        const encontrarbook = this.books.get(id);

        if (!encontrarbook){
            throw Error("Livro não encontrado ");
        }return encontrarbook;
    }

    findAll(): Book[]{
        
       if(this.books.size === 0){
            throw Error("Não há livros cadastrados");
        }return Array.from(this.books.values());
 }}