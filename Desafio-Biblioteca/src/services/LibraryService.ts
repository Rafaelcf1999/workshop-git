import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import Book from "../entities/Book.ts";
import User from "../entities/User.ts";
import Loan from "../entities/Loan.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";


export default class LibraryService {

    public books!: IBookRepository;
    public users!: IUserRepository;
    public loans!: ILoanRepository;

    constructor(books: IBookRepository, users: IUserRepository, loans: ILoanRepository) {
        this.books = books;
        this.users = users;
        this.loans = loans;
    }

    registerBook(book: Book) {
        if(!this.books.save(book)){
            return console.error(`Um livro com o ID ${book.id} já está cadastrado no sistema.`);
        }

        this.books.save(book); 
        console.log("Livro registrado com sucesso!")
    }

    registerUser(user: User) {
        if(!this.users.save(user)){
            return console.error(`Um usuário com o ID ${user.id} já está cadastrado no sistema.`);
        }

        this.users.save(user); 
        console.log("Usuário registrado com sucesso!")
    }

    loanBook(userId: number, bookId: number) {
        const user = this.users.findById(userId);
        const book = this.books.findById(bookId);

        if (!user || !book) {
            return console.error("ID de usuário ou livro inválido!");
        }

        if (book.getquantity() <= 0) {
            return console.error("Livro indisponível!")
        }

        const loan = this.loans.save(userId, bookId);

        if (!loan) {
            return console.error(`Usuário ${userId} já está com o livro ${bookId}.`);
        }

        book.decrease();
        return console.log("Empréstimo concluído!");
    }

    giveBackBook(userId: number, bookId: number) {
        const user = this.users.findById(userId);
        const book = this.books.findById(bookId);

        if (!user || !book) {
            return console.error("ID de usuário ou livro inválido!");
        }

        const giveBack = this.loans.remove(userId, bookId);

        if (!giveBack) {
            return console.error(`Usuário ${userId} não está com o livro ${bookId}`);
        }

        book.increase();
        return console.log("Devolução concluída!");
    }

    search(strategy: SearchStrategy, value: string) {
        const book = this.books.findAll();
        return strategy.search(book, value); 
    }
}