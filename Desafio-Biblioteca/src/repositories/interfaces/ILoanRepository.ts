export default interface ILoanRepository{
    save(userid: number, bookid: number): void;
    remove(userid: number, bookid: number): void;
    findAll(): void;
}