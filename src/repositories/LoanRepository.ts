import { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  save(loan: Loan): void {
    // fazer verificação
    console.log("UserId e BookId:", this.loans);
    this.loans.push(loan);
  }

  remove(userId: number, bookId: number): void {
    const loanIndex = this.loans.findIndex(
      (item) => item.userId === userId && item.bookId === bookId,
    );

    if (loanIndex === -1) throw new Error("Empréstimo não encontrado.");

    this.loans.splice(loanIndex, 1);
  }

  findAll(): Loan[] {
    throw new Error("Method not implemented.");
  }
}
