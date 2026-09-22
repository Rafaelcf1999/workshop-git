import { Loan } from "../../entities/Loan";

export interface ILoanRepository {
  save(book: Loan): void;
  remove(book: Loan[]): Loan;
  findAll(): Loan[];
}
