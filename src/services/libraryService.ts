import { Book } from "../entities/Book.ts";
import { Loan } from "../entities/Loan.ts";
import type { User } from "../entities/User.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { IBookSearchStrategy } from "../strategys/interfaces/IBookSearchStrategy.ts";

export class LibraryService{
    constructor(
        private books: IBookRepository,
        private users: IUserRepository,
        private loans: ILoanRepository
    ){}

    registerBook(bookList: Book[]): void{
        try {
            for (const book of bookList) {
               this.books.save(book) 
            }
        } catch (error: any) {
            console.log(`erro ao cadastrar livro ${error.message}`)
        }
    }
    registerUser(userList: User[]): void{
        try {
            for (const user of userList) {
               this.users.save(user) 
            }
        } catch (error: any) {
            console.log(`erro ao cadastrar usuario ${error.message}`)
        
        }
    }
    loanBook(userId: number, bookId: number): void{
        try {
            const user = this.users.findById(userId)
            const book = this.books.findById(bookId)
            book.decrease()
            const loan = new Loan(userId,bookId)
            this.loans.save(loan)
            console.log(`Emprestimo feito com sucesso para o livro ${book.title}`)
            
        } catch (error: any) {
            console.log(`Erro ao fazer emprestimo do livro ${error.message}`)
        }

    }
    giveBackBook(userId: number, bookId: number): void{
        try {
            const book = this.books. findById(bookId);

            book.increase()
            const loan = new Loan(userId, bookId)

            this.loans.remove(loan)
            console.log(`Devolução registrada com sucesso parao livro ${book.title}`)
            
        } catch (error: any) {
            console.log(`falha na adevolução ${error.message}`)
        }
    }
    search(strategy: IBookSearchStrategy): Book[]{
        try {
            const allBooks = this.books.findAll()
            return strategy.search(allBooks)
        } catch (error: any) {
            console.log(`Erro na busca: ${error.message}`);
            return[]
        }
    }
}