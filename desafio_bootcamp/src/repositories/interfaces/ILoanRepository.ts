import { Loan } from "../../entities/Loan.ts";
import type { IRepository } from './IRepository.ts';

export interface ILoanRepository extends IRepository<Loan> {
    remove(user: Loan): void;
}