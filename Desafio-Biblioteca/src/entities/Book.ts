export default class Book {

    public id: number;
    public title: string;
    public author: string;
    public category: string;
    private _quantity: number;

    constructor(id: number, title: string, author: string, category: string, _quantity: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this._quantity = _quantity;
    }

    increase() {
        this._quantity++;
    }

    decrease() {
        if (this._quantity <= 0) {
            console.log("No Copies Available!")
            return false;
        }

        this._quantity--;
    }

    getquantity(): number {
        return this._quantity;
    }
}