export class Book{
    public id:number;
    public title: string;
    public author:string ; 
    public category:string ;
    private quantity:number;

    constructor (id:number, título: string, autor: string, categoria: string, cópias: number){
      this.id= id;
      this.title= título;
      this.author= autor;
      this.category= categoria;
      this.quantity= cópias;
}

public decrease():void {
if(this.quantity <= 0 ){
    throw new Error("No copies available");
}
  this.quantity-=1;
}

public increase(): void{
  this.quantity+=1;
}

public getQuantity(): number{
    return this.quantity;
}}