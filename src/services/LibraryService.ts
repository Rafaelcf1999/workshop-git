import Book from "../entities/Book.ts";
import Loan from "../entities/Loan.ts";
import User from "../entities/User.ts";
import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import { FilterEnum } from "../enum/Filter.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";
import SearchByTitle from "../strategies/SearchByTitle.ts";
import SearchByAuthor from "../strategies/SearchByAuthor.ts";
import SearchByCategory from "../strategies/SearchByCategory.ts";

export default class LibraryService {
    constructor(
        private bookRepository: IBookRepository, 
        private userRepository: IUserRepository, 
        private loanRepository: ILoanRepository) {}

    /**
     * Salva uma lista de livros no repositório.
     * @param books A lista de livros a ser salva
     * @returns A lista de livros salvas no repositório
     * @throws Error se algum livro da lista já estiver registrado no repositório
     */
    registerBook(books: Book[]): Book[] | null{
        try {
            for (const book of books) {
                this.bookRepository.save(book);
            }
            console.log("Books registered successfully.");
            return books;
        } catch (error) {
            console.log("Error while registering book:", (error as Error).message);
            return null;
        }
        
    }
    /**
     * Salva uma lista de usuários no repositório.
     * @param users A lista de usuários a ser salva
     * @returns A lista de usuários salvas no repositório
     * @throws Error se algum usuário da lista já estiver registrado no repositório
     */
    registerUser(users: User[]): User[] | null {
        try {
            for (const user of users) {
                this.userRepository.save(user);
            }
            console.log("Users registered successfully.");
            return users;
        } catch (error) {
            console.error("Error while registering user:", (error as Error).message);
            return null;
        }
    }
    /**
     * Realiza o empréstimo de um livro para um usuário se ainda possuir cópias disponíveis.
     * @param userId O ID do usuário que deseja realizar o empréstimo.
     * @param bookId O ID do livro que deseja emprestar.
     * @returns O empréstimo realizado ou null se ocorrer algum erro.
     */
    loanBook(userId: number, bookId: number): Loan | null{
        try {
            const bookToLoan = this.bookRepository.findById(bookId);
            const user = this.userRepository.findById(userId);
            
            bookToLoan!.descrease();
            console.log(`Book '${bookToLoan!.title}' loaned to user ${user!.name} successfully.`);
            return this.loanRepository.save(new Loan(user!.id, bookToLoan!.id));
        }
        catch (error) {
            console.error("Error while loaning book:", (error as Error).message );
            return null
        }

    }
    /**
     * Realiza a devolução de um livro emprestado por um usuário.
     * @param userId O ID do usuário que deseja devolver o livro.
     * @param bookId O ID do livro que deseja devolver.
     * @returns O livro devolvido ou null se ocorrer algum erro.
     */
    givenBackBook(userId: number, bookId: number): Book | null {
        try {
            const user = this.userRepository.findById(userId);
            const book = this.bookRepository.findById(bookId);
            const loan = this.loanRepository.remove(user!, book!); 
            book!.increase();
            console.log(`Removed loan ${loan?.id} - Book '${book!.title}' returned successfully.`);
            return book!;
        } catch (error) {
            console.error("Error while returning book:", (error as Error).message);
            return null;
        }
    }

    /**
     * Realiza a devolução de um livro emprestado por um usuário através do ID do empréstimo.
     * @param loanId O ID do empréstimo que deseja devolver.
     * @returns O livro devolvido ou null se ocorrer algum erro.
     */
    givenBackBookByLoanId(loanId: number): Book | null {
        try {
            const loan = this.loanRepository.findById(loanId);
            const book = this.bookRepository.findById(loan!.bookId);
            
            book!.increase();
            this.loanRepository.removeById(loan!.id);
            console.log(`Removed loan ${loanId} - Book '${book!.title}' returned successfully.`);
            return book!;
        } catch (error) {
            console.error("Error while returning book by loan ID:", (error as Error).message);
            return null;
        }

    }
    /**
     * Realiza a busca de livros no repositório de acordo com o termo e o filtro fornecidos, 
     * utilizando o padrão Strategy para definir a estratégia de busca.
     * @param term O termo a ser buscado
     * @param filter O filtro de busca a ser utilizado (título, autor ou categoria)
     * @returns Um array de livros que correspondem aos critérios de busca ou null se ocorrer algum erro.
     */
    searchBook(term: string, filter: FilterEnum): Book[] | null {
        let searchStrategy: SearchStrategy<Book> | null;
        try {
            searchStrategy = this.getSearchStrategy(filter);
            console.log(`Searching for books with term: ${term} and filter: ${filter}`);
            return this.bookRepository.search(searchStrategy, term);
        } catch (error) {
            console.error("Error while searching book:", (error as Error).message);
            return null;
        }
    }
    
    private getSearchStrategy(filter: FilterEnum): SearchStrategy<Book> {
        switch (filter) {
            case FilterEnum.AUTHOR:
                return new SearchByAuthor();
            case FilterEnum.TITLE:
                return new SearchByTitle();
            case FilterEnum.CATEGORY:
                return new SearchByCategory();
            default:
                throw new Error("Invalid search filter.");
        }
    }
    
    /**
     * Retorna todos os livros cadastrados no repositório.
     * @returns os livros cadastrados no repositório ou null se ocorrer algum erro.
     */
    findAllBooks(): Book[] | null {
        try {
            return this.bookRepository.findAll();
        } catch (error) {
            console.error("Error while finding all books:", (error as Error).message);
            return null;
        }
    }

    /**
     * Retorna todos os usuários cadastrados no repositório.
     * @returns os usuários cadastrados no repositório ou null se ocorrer algum erro.
     */
    findAllUsers(): User[] | null {
        try {
            return this.userRepository.findAll();
        } catch (error) {
            console.error("Error while finding all users:", (error as Error).message);
            return null;
        }
    }

    /**
     * Retorna todos os empréstimos cadastrados no repositório.
     * @returns os empréstimos cadastrados no repositório ou null se ocorrer algum erro.
     */
    findAllLoans(): Loan[] | null {
        try {
            return this.loanRepository.findAll();
        } catch (error) {
            console.error("Error while finding all loans:", (error as Error).message);
            return null;
        }
    }
}