import { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {

    public loans: Loan[] = [];

    public save(loan: Loan): void {
        const existingLoan = this.loans.find(
            (l) => l.userId === loan.userId && l.bookId === loan.bookId
        );
        if (existingLoan) {
             throw new Error ("Já existe um empréstimo para este usuário e livro");
        }
        this.loans.push(loan);
    
    }
    public remove(loan: Loan): void {
        const index = this.loans.findIndex(
            (l) => l.userId === loan.userId && l.bookId === loan.bookId
        );
        if (index === -1) {
             throw new Error("Empréstimo não encontrado");
        }
        this.loans.splice(index, 1);
    }
    public findAll(): Loan[] {
        if (this.loans.length === 0) {
             throw new Error("Nenhum empréstimo cadastrado");
        }
        return this.loans;
    }
}