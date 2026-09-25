import Book from "../../entities/Book.ts";
import type Loan from "../../entities/Loan.ts";
import User from "../../entities/User.ts";
import type BaseRepository from "./BaseRepository.ts";

export default interface ILoanRepository extends BaseRepository<Loan> {
    remove(user: User, book: Book): Loan | null;
    // removeById(loanId: number): Loan | null;
}