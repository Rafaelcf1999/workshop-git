import Loan from "../entities/Loan";
import ILoanRepository from "./interfaces/ILoanRepository";

class LoanRepository implements ILoanRepository {
  private readonly loans: Loan[] = [];

  save(loan: Loan): void {
    this.loans.push(loan);
  }

  remove(loan: Loan): void {
    const loanIndex = this.loans.findIndex(
      (storedLoan) =>
        storedLoan.bookId === loan.bookId && storedLoan.userId === loan.userId,
    );

    if (loanIndex === -1) {
      throw new Error("Empréstimo não encontrado");
    } else {
        this.loans.splice(loanIndex, 1);
    }

    
  }

  findAll(): Loan[] {
    if (this.loans.length === 0) {
      throw new Error("Sem empréstimos registrados");
    }

    return this.loans;
  }
}

export default LoanRepository;
