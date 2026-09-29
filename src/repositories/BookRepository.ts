import type Book from "../entities/Book.ts";
import type IBookRepository from "./interfaces/IBookRepository.ts";

export default class BookRepository implements IBookRepository{
    private readonly books: Map<number, Book> = new Map()
    
    save(book: Book): void {
        if(this.books.has(book.id) === true){
            throw new Error("Book already exists!");
        }

        this.books.set(book.id, book);
        console.log("Book registered");
    }

    findById(id: number): Book{
        const resposta = this.books.get(id);

        if(resposta === undefined){
            throw new Error("Book not found");
        }  
        
        return resposta;
    }

    findAll() {
        if (this.books.size <= 0){
            throw new Error("No books registered");
        }
        return this.books;
        
        /*for(const [id, book] of this.books.entries()){
            console.log(`${id} => ${book}`);
        }*/

        /*for(let book of this.books.values()){
            console.log(book)
        }*/
    }
    
}
