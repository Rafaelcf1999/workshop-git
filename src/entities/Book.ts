export class Book{
    public readonly id: number
    public title: string
    public author: string
    public category: string
    private _quantity: number

    constructor (
        id:number,
        title: string,
        author: string,
        category: string,
        _quantity: number,
    ){
        this.id = id,
        this.title = title ,
        this.author = author,
        this.category = category,
        this._quantity = _quantity
    }
    public decrease(): void{
        if(this._quantity <= 0){
            throw new Error("Sem copias disponiveis")
        }
        this._quantity -= 1
    }
    public increase(): void{
        this._quantity += 1
    }
    public getQuantiy(): number{
        return this._quantity
    }
}