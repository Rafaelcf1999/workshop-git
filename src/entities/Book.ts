export class Book {
    public id: number;
    public title: string;
    public author: string;
    public category: string;
    private _quantity: number;

    constructor(id: number, title: string, author: string, category: string, quantity: number){
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this._quantity = quantity;
    }
    

    decrease(){
        if(this._quantity <= 0){
            throw new Error("Não temos livro em estoque");  
        }else {
            this._quantity -= 1;
        }
    }

    increase(): void{
        this._quantity += 1;
    }

    get Quantity(): number{
        return this._quantity;
    }
}

