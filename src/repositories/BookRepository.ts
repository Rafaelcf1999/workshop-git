import Book from "../entities/Book.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";
import type IBookRepository from "./interfaces/IBookRepository.ts";

export default class BookRepository implements IBookRepository {
    private books: Map<number, Book> = new Map<number, Book>();
    
    save(objectToSave: Book): Book {
        const bookAlreadyExists = this.books.get(objectToSave.id);
        if (bookAlreadyExists) throw new Error("ERRO: Livro já registrado.");
        this.books.set(objectToSave.id, objectToSave);
        return objectToSave;
    }
    findById(id: number): Book | null {
        const book = this.books.get(id);
        if (!book) throw new Error("ERRO: Livro não encontrado.");
        return book || null;
    }
    findAll(): Book[] {
        const allBooks: Book[] = Array.from(this.books.values());
        if (allBooks.length === 0) throw new Error("ERRO: Nenhum livro registrado.");
        return allBooks;
    }

    search(strategy: SearchStrategy<Book>, term: string): Book[] {
        const allBooks: Book[] = Array.from(this.books.values());
        return strategy.search(allBooks, term);
    }
    
}
