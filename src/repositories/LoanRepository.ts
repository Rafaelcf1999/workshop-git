import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";
import { Loan } from "../entities/Loan.ts";

export class LoanRepository implements ILoanRepository{
    private loans: Array<Loan> = [];

    save(loan: Loan): void {
        const existLoan = this.loans.some(x => x.userId === loan.userId && x.bookId === loan.bookId);

        if(existLoan){
            throw new Error(`There is already a loan associated with this user ID: "${loan.userId}" and book ID: "${loan.bookId}"`);
        }
        this.loans.push(loan);
    }

    remove(userId: number, bookId: number): void {
        const existLoan = this.loans.some(x => x.userId === userId && x.bookId === bookId);
        if(!existLoan){
            throw new Error("There is no loan to be removed");
        }
        this.loans = this.loans.filter(x => !(x.userId === userId && x.bookId === bookId));
    }

    findAll(): Loan[] {
        return this.loans;
    }
}