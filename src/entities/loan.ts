export class Loan{
    public readonly userId: Number;
    public readonly bookId: Number;

    constructor(userId: Number, bookId: Number){
        this.userId = userId;
        this.bookId = bookId;
    }
}