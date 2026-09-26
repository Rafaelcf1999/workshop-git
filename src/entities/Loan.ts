//proprieades readonly: userId(number), bookId(number)
//representa o empréstimo

export class Loan{
    constructor(
        public readonly userId: number,
        public readonly bookId: number
    ){}
}