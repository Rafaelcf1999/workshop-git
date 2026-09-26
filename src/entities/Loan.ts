export class Loan{
    public readonly userId: number;
    public readonly bookId: number;

    constructor(userId: number, bookId: number){
        this.userId = userId;
        this.bookId = bookId;
    }
}