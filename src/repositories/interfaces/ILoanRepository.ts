import { Loan } from "../../entities/Loan.ts";

export interface ILoanRepository {
  save(book: Loan): void;
  remove(book: Loan[]): Loan;
  findAll(): Loan[];
}
