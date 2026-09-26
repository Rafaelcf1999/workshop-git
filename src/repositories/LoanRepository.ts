import type { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {
  private readonly loans: Loan[] = [];

  public save(loan: Loan): void {
    const loanAlreadyExists = this.loans.some(
      (registeredLoan) =>
        registeredLoan.userId === loan.userId &&
        registeredLoan.bookId === loan.bookId,
    );

    if (loanAlreadyExists) {
      throw new Error("Loan already exists");
    }

    this.loans.push(loan);
  }

  public remove(userId: number, bookId: number): void {
    const loanIndex = this.loans.findIndex(
      (loan) => loan.userId === userId && loan.bookId === bookId,
    );

    if (loanIndex === -1) {
      throw new Error("Loan not found");
    }

    this.loans.splice(loanIndex, 1);
  }

  public findAll(): Loan[] {
    return [...this.loans];
  }
}
