import { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  save(loan: Loan): void {
    const exists = this.loans.some(
      (item) => item.userId === loan.userId && item.bookId === loan.bookId
    );
    if (exists) {
      throw new Error(
        `Loan already exists for user id ${loan.userId} and book id ${loan.bookId}`
      );
    }
    this.loans.push(loan);
  }

  remove(userId: number, bookId: number): void {
    const index = this.loans.findIndex(
      (item) => item.userId === userId && item.bookId === bookId
    );
    if (index === -1) {
      throw new Error(
        `Loan not found for user id ${userId} and book id ${bookId}`
      );
    }
    this.loans.splice(index, 1);
  }

  findAll(): Loan[] {
    return [...this.loans];
  }
}
