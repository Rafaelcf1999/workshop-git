import {Loan} from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";


export class LoanRepository implements ILoanRepository {
    private loans: Loan[] = [];

    save(loan: Loan): void {
        const encontrarLoan = this.loans.some(
            emprestimo =>
                emprestimo.user_id === loan.user_id 
                &&
                emprestimo.book_id === loan.book_id );

        if (encontrarLoan) {
            throw Error("Esse empréstimo já está cadastrado");
        } this.loans.push(loan);
    }

    remove(userId: number,  BookId: number): void {
        for (let i = 0; i < this.loans.length; i++) { //i é para represesntar a posição dos emprétismos
            if (userId === this.loans[i].user_id && BookId === this.loans[i].book_id){
                this.loans.splice(i, 1);
                return;
            }
        }

        throw Error("Empréstimo não encontrado");
    }

    findAll(): Loan[] {
        return this.loans;
    } }