import type { Loan } from "../../entities/Loan.js";

export interface ILoanRepository{
    save(loan: Loan): void
    findById(id:Number): Loan
    findAll(): Loan[];
}

