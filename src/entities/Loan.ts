export class Loan{
   public readonly user_id:number;
   public readonly book_id:number;

    constructor (user_id:number, book_id: number){
      this.user_id= user_id;
      this.book_id= book_id;
}
}
