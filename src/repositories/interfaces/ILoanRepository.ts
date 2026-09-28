import { Loan } from "../../entities/Loan.ts";

export interface ILoanRepository {
    save(loan: Loan): void;
    findByUserId(userId: number): Loan[];
    findAll(): Loan[];
}