import Loan from "../entities/Loan.ts";
import type ILoanRepository from "./interfaces/ILoanRepository.ts";

export default class LoanRepository implements ILoanRepository{

    public loans: Loan[] = [];
    
    save(userid: number, bookid: number) {

        for(let loan of this.loans){
            if(loan.userId === userid && loan.bookId === bookid){
                console.error(`Usuário ${userid} já está com o livro ${bookid}`)
            }
        }

        this.loans.push(new Loan(userid, bookid));
    }

    remove(userid: number, bookid: number){

        let loancount = 0;

        for(let loan of this.loans){
            if(loan.userId === userid && loan.bookId === bookid){
                this.loans.splice(loancount, 1);
                return true;
            }

            loancount++;
        }

        console.error(`Usuário ${userid} não está com o livro ${bookid}`)
    }

    findAll(){
        for(let loan of this.loans){
            console.log(loan)
        }
    }
    
}

