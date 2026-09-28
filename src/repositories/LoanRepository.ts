import {Loan} from "../entities/Loan.js";
import type ILoanRepository from "./interfaces/ILoan.js";

export default class LoanRepository implements ILoanRepository{
    private loans: Loan[] = []

    save(loan: Loan): Loan {
        for(const item of this.loans){
            if(item.UserId === loan.UserId && item.BookId === loan.BookId) {
                throw new Error(`O usuario com ID ${loan.UserId} já possui um emprestimo ativo para o livro com ID ${loan.BookId}.`);
                
            }
        }

        this.loans.push(loan);
        return loan;
    }

    remove(userId: number, bookId: number): void {
        let foundIndex = -1;

        for (let i = 0; i < this.loans.length; i++) {
            const loan = this.loans[i];
            if (loan && loan.UserId === userId && loan.BookId === bookId){
                foundIndex = i;
                break;
            }
        }

        if (foundIndex === -1) {
            throw new Error(`Empréstimo não encontrado para o usuário ID ${userId} e livro ID ${bookId}.`);
        }

        this.loans.splice(foundIndex, 1);
    }
    
    findAll(): Loan[] {
        if (this.loans.length === 0) {
            throw new Error("Nenhum emprestimo cadastrado.");
        }

        return this.loans;
    }
    
}