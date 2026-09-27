import Book from "../entities/Book.ts";
import User from "../entities/User.ts";
import Loan from "../entities/Loan.ts";
import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";

export default class LibraryService{

    constructor(
        private books: IBookRepository,
        private users: IUserRepository,
        private loans: ILoanRepository,
    ){
        this.books = books;
        this.users = users;
        this.loans = loans;
    }

    registerBook(books: Book[]): void{
        try{
            for(const book of books){
                this.books.save(book);
            }
        } catch(error){
            console.error(error);
        }
    }

    registerUser(users: User[]): void{
        try{
            for(const user of users){
                this.users.save(user);
            }
        }catch(error){
            console.error(error);
        }
    }

    loanBook(userId: number, bookId: number): void{
         try {
            this.users.findById(userId);
            const book = this.books.findById(bookId);

            const loanExistente = this.loans.findAll().find(
                emprestimo =>
                    emprestimo.userId === userId &&
                    emprestimo.bookId === bookId
            );

            if (loanExistente) {
                throw new Error("Empréstimo já existe.");
            }

            book.decrease();

            const loan = new Loan(userId, bookId);
            this.loans.save(loan);

        } catch (error) {
            console.error(error);
        }
    }

    giveBackBook(userId: number, bookId: number): void{
        try {
            this.users.findById(userId);
            const book = this.books.findById(bookId);

            const loanExistente = this.loans.findAll().find(
                emprestimo =>
                    emprestimo.userId === userId &&
                    emprestimo.bookId === bookId
            );

           if (!loanExistente) {
                throw new Error("Empréstimo não encontrado.");
            }

            this.loans.remove(loanExistente);
            book.increase();

        } catch (error) {
            console.error(error);
        }
    }

    search(strategy: SearchStrategy, value: string): Book[]{
        try{
            const books = this.books.findAll();

            return strategy.search(books, value);

        } catch(error){
            console.error(error);
            return [];
        }
    }
}
