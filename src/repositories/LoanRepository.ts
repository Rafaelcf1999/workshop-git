import Loan from "../entities/Loan.ts";
import ILoanRepository from "./interfaces/ILoanRepository.ts";

export default class LoanRepository implements ILoanRepository{

    private loans: Loan[] = [];
    
    public save(loan: Loan): void {
        this.loans.push(loan);
    }

    public remove(userId: number, bookId: number): void {
        this.loans = this.loans.filter(
            loan => !(loan.userId === userId && loan.bookId === bookId)
        );
    }

    public findAll(): Loan[] {
        return this.loans;
    }
}