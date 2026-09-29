import type ILoanRepository from "./interfaces/ILoanRepository.ts";
import type Loan from './../entities/Loan.ts';

export default class LoanRepository implements ILoanRepository{
    private readonly loans: Loan[] = [];

    save(loanUser: Loan): void {
        this.loans.forEach(loan => {
            if(loan.userId === loanUser.userId && loan.bookId === loanUser.bookId){
                throw new Error("Loan already exists!");
            }
        })

        this.loans.push(loanUser)
        console.log("Loan registered");
    }

    remove(userId: number, bookId: number): void {
        if (this.loans.length <= 0){
            throw new Error("No loans registered");
        }

        for(let i = 0; i < this.loans.length; i++){
            if(this.loans[i].userId === userId && this.loans[i].bookId === bookId ){
                this.loans.splice(i, 1);
                return;
            }
        }
        throw new Error("Loan not found");
    }

    findAll(): Loan[] {
        if (this.loans.length <= 0){
            throw new Error("No loans registered");
        }
        return this.loans;
        
        /*for(let loan of this.loans){
            console.log(`${loan.userId} => ${loan.bookId}`)
        }*/
    }

}
