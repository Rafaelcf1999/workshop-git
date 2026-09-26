//deve definir os contratos: save(retirni void), remove(retorno void), findAll(retorna uma lista com todos os empréstimos)

import { Loan } from "../../entities/Loan.ts";

export interface ILoanRepository{
    save(loan: Loan): void;
    remove(userId: number, bookId: number): void;
    findAll(): Loan[];
}