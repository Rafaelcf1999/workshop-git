export default class Loan {
    readonly userId: number;
    readonly bookId: number;

    constructor(userId: number, bookId: number) {
        this.userId = userId;
        this.bookId = bookId;
    }
}