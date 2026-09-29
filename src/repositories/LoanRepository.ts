import { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {
    private loans: Loan[] = [];

    save(loan: Loan): void {
        const existingLoan = this.loans.some(l => l.userId === loan.userId && l.bookId === loan.bookId);
        if (existingLoan) {
            throw new Error(`Empréstimo para o usuário ID ${loan.userId} e livro ID ${loan.bookId} já existe.`);
        }
        this.loans.push(loan);
    }

    remove(userId: number, bookId: number): void {
        const index = this.loans.findIndex(loan => loan.userId === userId && loan.bookId === bookId);
        if (index === -1) {
            throw new Error(`Empréstimo para o usuário ID ${userId} e livro ID ${bookId} não encontrado.`);
        }
        this.loans.splice(index, 1);
    }

    findAll(): Loan[] {
        return this.loans;
    }
}