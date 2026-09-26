import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import Book from "../entities/Book.ts";
import User from "../entities/User.ts";
import Loan from "../entities/Loan.ts";


export default class LibraryService{

    public books!: IBookRepository;
    public users!: IUserRepository;
    public loans!: ILoanRepository;

    constructor(books: IBookRepository, users: IUserRepository, loans: ILoanRepository){
        this.books = books;
        this.users = users;
        this.loans = loans;
    }

    registerBook(book: Book){
        this.books.save(book);
    }

    registerUser(user: User){
        this.users.save(user);
    }

    loanBook(userId: number, bookId: number){
        const user = this.users.findById(userId);
        const book = this.books.findById(bookId);

        if(user && book){
            book.decrease();
            this.loans.save(userId, bookId);
            return console.log("Empréstimo concluído!");
        }

        /*if(this.books.findById(userId) && this.books.findById(bookId)){
            this.loans.save(userId, bookId);
            return console.log("Empréstimo concluído!");
        }*/

        console.error("Não foi possível realizar o empréstimo. ID de usuário ou livro inválido!");
    }

    giveBackBook(userId: number, bookId: number){
        const user = this.users.findById(userId);
        const book = this.books.findById(bookId);

        if(user && book){
            book.increase();
            this.loans.remove(userId, bookId);
            return console.log("Devolução concluída!");
        }

        console.error("Não foi possível realizar a devolução. ID de usuário ou livro inválido!");
    }

    search(){
        
    }
}