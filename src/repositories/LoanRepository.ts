import type { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository{

    private loans: Loan[] = []

    loanExist(loan: Loan): boolean {
        return this.loans.some(
            existingLoan =>
            existingLoan.userId === loan.userId &&
            existingLoan.bookId === loan.bookId
        )
    }

    save(loan: Loan): void {
        const exist = this.loanExist(loan)
        if (exist) {
            throw new Error("emprestimo ja realizado.");
        }
        this.loans.push(loan);
    }

    remove(loan: Loan): void {
        const index = this.loans.findIndex(
            existingLoan =>
            existingLoan.userId === loan.userId &&
            existingLoan.bookId === loan.bookId
        );

        if (index === -1) {
            throw new Error("emprestimo não realizado.");
        }

        this.loans.splice(index, 1);
    }

    findAll(): Loan[] {
        return this.loans;
    }
}


