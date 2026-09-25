import Book from "../entities/Book";
import IBookRepository from "./interfaces/IBookRepository";

export default class BookRepository implements IBookRepository {

    private booksDataBase = new Map<number, Book>();

    save(book: Book): void {
       if(this.alreadyExist(book.id)) {
        throw new Error('Livro com esse id já está cadastrado');
       }
       console.log('Tudo ok, cadastrando o livro com o id = ' + book.id)
       this.booksDataBase.set(book.id, book);
       book.increase;
    }

    findById(id: number): Book {
        const foundBook = this.booksDataBase.get(id);
        if(!foundBook){
            throw new Error('não há cadastro de livro com o id = ' + id);
        }
        return foundBook;
       
    }

    findAll(): Book[] {
        const listBooks: Book[] = [];
        for (const book of this.booksDataBase) {
            if(!book){
                listBooks.push(book);
            }
        }
        return listBooks;
    }

    private alreadyExist(id: number): boolean {
        const foundBook = this.booksDataBase.get(id);
        return foundBook !== undefined;
    }
    
}