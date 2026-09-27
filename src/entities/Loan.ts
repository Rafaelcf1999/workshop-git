/*Loan Propriedades userId (number) e bookId (number), ambas somente leitura (readonly).
Representa o vínculo entre um usuário e um livro emprestado. */

export class Loan{
    constructor(
        public readonly userId: number,
        public readonly bookId: number
    ){}
}