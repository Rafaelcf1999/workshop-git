/* 
Armazene os empréstimos em um array (Loan[]).
save: lança erro se já existir um empréstimo para a mesma combinação de userId e bookId.
remove: lança erro se o empréstimo não for encontrado. Remove o item do array.
findAll: retorna todos os empréstimos.
*/
import {Loan} from "../entities/Loan.ts";
import type {ILoanRepository} from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository{

    private readonly loans: Loan[] = [];

    public save(loan: Loan): void {
        const exists = this.loans.some(
            (l) => l.userId === loan.userId && l.bookId === loan.bookId
        );
        if(exists){
            throw new Error(
                `relacao entre o ususario ${loan.userId} e o livro ${loan.bookId} ja existe`
            );
        }
        this.loans.push(loan);
    }

    public remove(userId: number, bookId: number): void {
        const index = this.loans.findIndex(
                (l) => l.userId === userId && l.bookId === bookId
        );
        if(index === -1){
            throw new Error(
                `Relacao entre o usuario ${userId} e o livro ${bookId} nao encontrada`
            );

        }
        this.loans.splice(index,1);

    }

    public findAll(): Loan[] {
        return [...this.loans];
    }

}
