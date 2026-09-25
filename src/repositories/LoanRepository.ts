import {Loan} from "../entities/Loan.js";
import type {ILoanRepository} from "./interfaces/ILoanRepository.js";

export class LoanRepository implements ILoanRepository {
    private loans: Loan[] = [];

    save(loan: Loan): void{
        const exists = this.loans.some( // método some() verifica se já existe um empréstimo com o mesmo userId e bookId
            (l) => l.userId === loan.userId && l.bookId === loan.bookId // o l significa cada elemento do array loans, e verifica se o userId e bookId são iguais ao do empréstimo que está sendo salvo
        );
        if (exists) { // caso exista, lança um erro
            throw new Error(`Loan already exists for this user and book.`);
        }
        this.loans.push(loan); // caso não exista, adiciona o empréstimo ao array
    }

    remove(userId: number, bookId: number): void {
        const index = this.loans.findIndex( // método findIndex() retorna o índice do primeiro elemento do array que satisfaz a função de teste fornecida
            (l) => l.userId === userId && l.bookId === bookId // aqui novamente, verifica se o userId e bookId são iguais ao do empréstimo que está sendo removido
        );
        if (index === -1) { // caso não exista, lança um erro
            throw new Error(`Loan not found`);
        }
        this.loans.splice(index, 1);
    }

    findAll(): Loan[] {
        return [...this.loans]; // retorna todos os empréstimos do array
    }
}
