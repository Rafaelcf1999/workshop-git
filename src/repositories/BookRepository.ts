import Book from "../entities/Book.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";
import type IBookRepository from "./interfaces/IBookRepository.ts";

export default class BookRepository implements IBookRepository {
    private books: Map<number, Book> = new Map<number, Book>();
    
    /**
     * Faz a persistência de um livro no repositório.
     * @param objectToSave O livro a ser salvo.
     * @returns O livro salvo
     * @throws Error se o já existir um livro com o mesmo ID do livro a ser salvo.
     */
    save(objectToSave: Book): Book {
        const bookAlreadyExists = this.books.get(objectToSave.id);
        if (bookAlreadyExists) throw new Error("Book already registered.");
        this.books.set(objectToSave.id, objectToSave);
        return objectToSave;
    }

    /**
     * Busca um livro pelo ID no repositório.
     * @param id Id do livro a ser buscado.
     * @returns o livro encontrado.
     * @throws Error se o livro não for encontrado.
     */
    findById(id: number): Book {
        const book = this.books.get(id);
        if (!book) throw new Error("Book not found.");
        return book;
    }

    /**
     * Procura todos os livros no repositório.
     * @returns os livros cadastrados no repositório.
     * @throws Error se não houver livros cadastrados.
     */
    findAll(): Book[] {
        const allBooks: Book[] = Array.from(this.books.values());
        if (allBooks.length === 0) throw new Error("No books registered.");
        return allBooks;
    }

    /**
     * Realiza uma busca de livros no repositório de acordo com a estratégia de busca fornecida e o termo de pesquisa.
     * @param strategy A estratégia de busca a ser utilizada.
     * @param term O termo a ser pesquisado.
     * @returns Os livros que correspondem à pesquisa.
     */
    search(strategy: SearchStrategy<Book>, term: string): Book[] {
        const allBooks: Book[] = Array.from(this.books.values());
        return strategy.search(allBooks, term);
    }
    
}
