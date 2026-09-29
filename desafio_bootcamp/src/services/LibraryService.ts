import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";
import { Loan } from "../entities/Loan.ts";
import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";


export class LibraryService {
    public bookRepository: IBookRepository;
    public userRepository: IUserRepository;
    public loanRepository: ILoanRepository;

    constructor(bookRepository: IBookRepository, userRepository: IUserRepository, loanRepository: ILoanRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.loanRepository = loanRepository;
    }

    public registerBook(books: Book[]): void {
        try {
            books.forEach(book => this.bookRepository.save(book));
        } catch (error) {
            console.error("Erro ao registrar livros:", error);
        }
    }

    public registerUser(users: User[]): void {
        try {
            users.forEach(user => this.userRepository.save(user));
        } catch (error) {
            console.error("Erro ao registrar usuários:", error);
        }
    }

    public loanBook(userId: number, bookId: number): void {
        try {
            const user = this.userRepository.findById(userId);
            const book = this.bookRepository.findById(bookId);
            if (book.getQuantity() > 0) {
                
                this.loanRepository.save(new Loan(userId, bookId));
                book.decrease();
            } else {
                console.error("Livro indisponível para empréstimo");
            }
        } catch (error) { 
            if (error instanceof Error) {
            console.error("Erro ao realizar empréstimo:", error.message);
        } else {
            console.error("ocorreu um erro inesperado");
        }
    }
}

    public giveBackBook(userId: number, bookId: number): void {
    try {
        const user = this.userRepository.findById(userId);
        const book = this.bookRepository.findById(bookId);
        
       
        this.loanRepository.remove(new Loan(userId, bookId));
        book.increase();
    } catch (error) {
        if ( error instanceof Error){
        console.error("Erro ao devolver livro:", error.message);
        }else{
            console.error("ocorreu um erro inesperado")
        }

}
    }

    public search(strategy: SearchStrategy, query: string): Book[] {
    try {
        const allBooks = this.bookRepository.findAll();
        return strategy.search(allBooks, query);
    } catch (error) {
        
        console.error("Erro ao realizar busca:", error);
        return [];
    }
}
    

}
