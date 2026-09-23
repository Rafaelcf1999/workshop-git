import { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  get loanView(): Loan[] {
    return this.loans;
  }

  save(loan: Loan): void {
    // fazer verificação
    this.loans.push(loan);
    console.log("UserId e BookId:", this.loans);
  }

  remove(userId: number, bookId: number): void {
    const initialLength = this.loans.length;

    this.loans = this.loans.filter(
      (loan) => loan.userId !== userId || loan.bookId !== bookId,
    );

    if (this.loans.length === initialLength) {
      throw new Error("O empréstimo não existe.");
    }
  }

  findAll(): Loan[] {
    throw new Error("Method not implemented.");
  }
}
