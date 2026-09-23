import type { Loan } from "../../entities/Loan.ts";

export interface ILoanRepository {
  save(book: Loan): void;
  remove(userId: number, bookId: number): void;
  findAll(): Readonly<Loan[]>;
}
