import type Loan from "../../entities/Loan.ts";
import type BaseRepository from "./BaseRepository.ts";

export default interface ILoanRepository extends BaseRepository<Loan> {}