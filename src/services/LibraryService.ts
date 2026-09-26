//deve depender apenas das interfaces para orquestrar todas as operacoes
//construtor: IbookRepository, IUserRepository, ILoanrepository
//metodos: registrerBook(slava uma lista de livros e retorna a lista), registerUser(salva uma lista de usuários e retorna a lista),
//loanBook(busca usuário e livro, decrementa do estoque e regista o empréstimo, retorna o empréstimo ou null)
//giveBackBook(busca usuário e livro, incrementa no estoque e remove o impréstimo, retorna o empréstimo ou null)
//search(executa a busca delegando para a estratégia recebida)
//todos os métodos devem capturar erros e exibí-los via console.error sem propagar a exeção para fora do serviço

import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService{
    constructor(
        private books: IBookRepository,
        private users: IUserRepository,
        private loans: ILoanRepository
    ){}

    public registerBook(books: Book[]): Book[]{
        const registered: Book[] = [];
        for(const book of books){
            try{
                this.books.save(book);
                registered.push(book);
            }catch(error){
                console.error((error as Error).message);
            }
        }
        return registered;
    }

    public registerUser(users: User[]): User[]{
        const registered: User[] = [];
        for(const user of users){
            try{
                this.users.save(user);
                registered.push(user);
            }catch(error){
                console.error((error as Error).message);
            }
        }
        return registered;
    }

    public loanBook(userId: number, bookId: number): Loan | null{
        try{
            this.users.findById(userId);
            const book = this.books.findById(bookId);
            const loan = new Loan(userId, bookId);
            this.loans.save(loan);
            try{
                book.decrease();
            }catch(error){
                this.loans.remove(userId, bookId);
                throw error;
            }
            return loan;
        }catch(error){
            console.error((error as Error).message);
            return null;
        }
    }

    public giveBackBook(userId: number, bookId: number): Loan | null{
        try{
            this.users.findById(userId);
            const book = this.books.findById(bookId);
            const loan = this.loans.findAll().find(
                l => l.userId === userId && l.bookId === bookId);
            this.loans.remove(userId, bookId);
            book.increase();
            return loan ?? null;
        }catch(error){
            console.error((error as Error).message);
            return null;
        }
    }

     public search(strategy: SearchStrategy, term: string): Book[]{
        try{
            const allBooks = this.books.findAll();
            return strategy.search(allBooks, term);
       }catch(error){
            console.error((error as Error).message);
            return [];
       }
    }
}
