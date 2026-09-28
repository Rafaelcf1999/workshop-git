import { Loan } from "../../entities/loan";

export interface ILoanRepository {
    save(loan: Loan): void;
    findByUserId(userId: number): Loan[];
    findAll(): Loan[];
}