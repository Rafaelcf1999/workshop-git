import Book from "../entities/Book.ts";
import Loan from "../entities/Loan.ts";
import User from "../entities/User.ts";
import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import { FilterType } from "../enum/Filter.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";
import SearchByTitle from "../strategies/SearchByTitle.ts";
import SearchByAuthor from "../strategies/SearchByAuthor.ts";
import SearchByCategory from "../strategies/SearchByCategory.ts";

export default class LibraryService {
    constructor(
        private bookRepository: IBookRepository, 
        private userRepository: IUserRepository, 
        private loanRepository: ILoanRepository) {}

    registerBook(books: Book[]): Book[] | null{
        try {
            for (const book of books) {
                this.bookRepository.save(book);
            }
            return books;
        } catch (error) {
            console.log("Erro ao registrar livro:", (error as Error).message);
            return null;
        }
        
    }
    registerUser(users: User[]): User[] | null {
        try {
            for (const user of users) {
                this.userRepository.save(user);
            }
            return users;
        } catch (error) {
            console.log("Erro ao registrar usuário:", (error as Error).message);
            return null;
        }
    }
    loanBook(userId: number, bookId: number): Loan | null{
        try {
            const bookToLoan = this.bookRepository.findById(bookId);
            const user = this.userRepository.findById(userId);
            
            bookToLoan!.descrease();
            
            return this.loanRepository.save(new Loan(user!.id, bookToLoan!.id));
        }
        catch (error) {
            console.log("Erro ao registrar empréstimo:", (error as Error).message );
            return null
        }

    }
    givenBackBook(userId: number, bookIde: number): Book | null {
        try {
            const user = this.userRepository.findById(userId);
            const book = this.bookRepository.findById(bookIde);
            const loan = this.loanRepository.remove(user!, book!); // dar um jeito de exibir dps
            book!.increase();
            return book!;
        } catch (error) {
            console.log("Erro ao registrar devolução:", (error as Error).message);
            return null;
        }
    }
    searchBook(term: string, filter: FilterType): Book[] {
        let searchStrategy: SearchStrategy<Book> | null;
        switch (filter) {
            case FilterType.AUTHOR:
                searchStrategy = new SearchByAuthor();
                break;
            case FilterType.TITLE:
                searchStrategy = new SearchByTitle();
                break;
            case FilterType.CATEGORY:
                searchStrategy = new SearchByCategory();
                break;
            default:
                throw new Error("Filtro inválido.");
        }
        return this.bookRepository.search(searchStrategy, term); // pensar no padrão strategy 
    } // pensar no padrão strategy
        
}