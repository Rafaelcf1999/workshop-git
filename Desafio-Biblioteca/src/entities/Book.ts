export default class Book {

    public id: number;
    public title: string;
    public author: string;
    public category: string;
    private _quantity: number;

    constructor(id: number, title: string, author: string, category: string, quantity: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this._quantity = quantity;
    }

    increase() {
        
    }

    decrease() {
        
    }

    getQuantity(): number {
        return this._quantity;
    }


}