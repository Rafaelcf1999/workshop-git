import Book from "../entities/Book";
import IBookRepository from "./interfaces/IBookRepository";

class BookRepository implements IBookRepository{
    private readonly books: Map<number, Book> = new Map();
    
    save(book: Book): void {
        if(this.books.has(book.id)){
            throw new Error("Esse ID ja está Cadastrado")
        } else {
            this.books.set(book.id, book);
        }
    }

    findById(id: number): Book {
        if(this.books.has(id)){
            return this.books.get(id) as Book;
        } else {
            throw new Error("Livro não encontrado");
        }
    }

    findAll(): Book[] {
        if (this.books.size === 0) {
        throw new Error("Sem livros registrados");
        }
        return Array.from(this.books.values());
    }
    

}

export default BookRepository;