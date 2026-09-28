import Loan from "../entities/Loan.ts";
import type  ILoanRepository from "./interfaces/ILoanRepository.ts";

export default class LoanRepository implements ILoanRepository{
    private loans: Array<Loan> = new Array<Loan>();

    save(loan: Loan): void {
        const exists = this.loans.find(l => loan.bookId === l.bookId && loan.userId === l.userId)

        if(exists){
            throw new Error("Loan already exists");
        }
        this.loans.push(loan);
    }

    remove(loan: Loan): void {
        const exists = this.loans.find(l => loan.bookId === l.bookId && loan.userId === l.userId)

        if(!exists){
            throw new Error("Loan not found");
        }
        this.loans.splice(this.loans.indexOf(exists), 1);
    }

    findAll(): Loan[] {
        if(this.loans.length === 0){
            throw new Error("No loans found");
        }
        return this.loans
    }

}