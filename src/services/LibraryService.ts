import Book from "../entities/Book.ts";
import Loan from "../entities/Loan.ts";
import User from "../entities/User.ts";
import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts"
import type ISearchStrategy from "../strategies/interfaces/ISearchStrategy.ts";

export default class LibraryService{
    constructor(
        public readonly books: IBookRepository,
        public readonly users: IUserRepository,
        public readonly loans: ILoanRepository
    ){}

    registerBook(books: Book[]): void{
        try{
            for(const newBook of books){
                this.books.save(newBook);
            }
            
            /*const newBook = new Book(id, title, author, category, quantity);
            this.books.save(newBook);*/

        } catch(erro){
            console.error(erro);

        }
    }

    registerUser(users: User[]): void{
        try{
            for(const newUser of users){
                this.users.save(newUser);
            }
            
            /*const newUser = new User(id, name);
            this.users.save(newUser);*/

        } catch(erro){
            console.error(erro);

        }
    }

    loanBook(userId: number, bookId: number): void{
        try{
            this.users.findById(userId);
            const book = this.books.findById(bookId);
            
            const newLoan = new Loan(userId, bookId);
            book.decrease();
            this.loans.save(newLoan);

        } catch (erro){
            console.error(erro);
        }
    }

    giveBackBook(userId: number, bookId: number){
        try{
            this.users.findById(userId);
            const book = this.books.findById(bookId);
            
            this.loans.remove(userId, bookId);
            book.increase();
            console.log("Book delivered");
            
        } catch(erro){
            console.error(erro);

        }
    }

    search(search: string, typeSearch: ISearchStrategy){
        try{
            const resultados = typeSearch.search(search, this.books.findAll());
            console.log("Search results ->", resultados);
        } 
        catch(erro){
            console.error(erro);
        }
    }
}
