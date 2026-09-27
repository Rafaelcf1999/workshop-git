import type { Loan } from "../../entities/Loan.js";

export interface ILoanRepository{
    save(loan: Loan): void
    remove(id: number): Loan
    findAll(): Loan[];
}

