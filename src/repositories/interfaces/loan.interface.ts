import { Loan } from "../../entities/loan.entity.ts";

export interface ILoanRepository {
  save(loan: Loan): void;
  remove(loan: Loan): void;
  findAll(): Loan[];
}
