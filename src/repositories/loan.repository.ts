import { Loan } from "../entities/loan.entity.ts";
import type { ILoanRepository } from "./interfaces/loan.interface.ts";

export class LoanRepository implements ILoanRepository {
  private loan: Loan[] = [];

  save(loan: Loan): void {
    const isUnavailable = this.loan.some(
      (loanValues) =>
        loanValues.bookId === loan.bookId && loanValues.userId === loan.userId,
    );

    if (isUnavailable) throw Error("Book already borrowed by this user");

    this.loan.push(loan);
  }

  remove(loan: Loan): void {
    const index = this.loan.findIndex(
      (loanValues) =>
        loanValues.bookId === loan.bookId && loanValues.userId === loan.userId,
    );

    if (index === -1) throw Error("Loan not found");

    this.loan.splice(index, 1);
  }

  findAll(): Loan[] {
    return this.loan;
  }
}
