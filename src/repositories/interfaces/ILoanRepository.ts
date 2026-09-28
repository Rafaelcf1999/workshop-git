import { Loan } from "../../entities/Loan.js";

export interface ILoanRepository{
    save(loan: Loan): void;
    remove(loan: Loan): void;
    findAll(): Loan[];
}