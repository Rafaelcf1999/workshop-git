import type Loan from "../entities/Loan.ts";
import type ILoanRepository from "./interfaces/ILoanRepository.ts";
export default class LoanRepository implements ILoanRepository {
    private loans: Loan[] = [];

    save(loan: Loan): void {
        const exists = this.loans.some(
            (l) => l.userId === loan.userId && l.bookId === loan.bookId
        );

        if (exists) {
            throw new Error(`Loan for user ${loan.userId} and book ${loan.bookId} already exists`);
        }

        this.loans.push(loan);
    }

    remove(loan: Loan): void {
        const index = this.loans.findIndex(
            (l) => l.userId === loan.userId && l.bookId === loan.bookId
        );

        if (index === -1) {
            throw new Error(`Loan for user ${loan.userId} and book ${loan.bookId} not found`);
        }

        this.loans.splice(index, 1);
    }

    findAll(): Loan[] {
        return this.loans;
    }

}