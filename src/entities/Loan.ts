export class Loan {
    readonly UserId: number;
    readonly BookId: number;

    constructor(UserId: number,  BookId: number ) {
        this.UserId = UserId;
        this.BookId = BookId;
    }
}