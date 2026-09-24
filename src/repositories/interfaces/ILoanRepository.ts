import Loan from "#entities/Loan";
import BaseRepository from "#repositories/interfaces/BaseRepository";

export default interface ILoanRepository extends BaseRepository<Loan> {}