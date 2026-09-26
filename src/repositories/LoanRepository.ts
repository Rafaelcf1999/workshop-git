//Armazena os empréstimos em um array(Loan[])
//save: lança erro se já existir impréstimo para os ids de user e book
//remove: lança erro se o empréstimo não for encontrado e remove o item do array
//findAll: retorna todos os empréstimos 

import { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository{

    private loans: Loan[] = [];

    public save(loan: Loan): void{
        const exists = this.loans.some(
            l => l.userId === loan.userId && l.bookId === loan.bookId);

            if(exists){
                throw new Error(`Loan for user ${loan.userId} and book ${loan.bookId} already exists`);
            }
            this.loans.push(loan);
    }

    public remove(userId: number, bookId: number): void{
        const index = this.loans.findIndex(
            l => l.userId === userId && l.bookId === bookId);

        if(index === -1){
            throw new Error(`Loan for user ${userId} and book ${bookId} not found`);
        }
        this.loans.splice(index, 1);
    }

    public findAll(): Loan[]{
        if(this.loans.length === 0){
            throw new Error("No loans registered");
        }
        return Array.from(this.loans);
    }
    
}