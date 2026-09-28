import type Loan from "../entities/Loan.ts";
import type ILoanRepository from "./interfaces/ILoanRepository.ts";

export default class LoanRepository implements ILoanRepository {

    private readonly loans: Loan[] = []

    save(loan: Loan): void {
        for(let existe of this.loans) {
            if(existe.userId === loan.userId && existe.bookId === loan.bookId){
                throw new Error(`O Usuário ${loan.userId} já está com o livro ${loan.bookId}`);
            }
        }
        this.loans.push(loan);
    }


    remove(loan: Loan): void {
        for(const [posicao, existe] of this.loans.entries()) {
            if(existe.userId === loan.userId && existe.bookId === loan.bookId){
                this.loans.splice(posicao, 1)
                return;
            }
        }
        throw new Error(`O Empréstimo desse usuário ${loan.userId} do livro ${loan.bookId} não foi encontrado`);
    }

    findAll(): Array<Loan> {
        return Array.from(this.loans);
    }

}