export default class Book {
    id: number;
    title: string;
    author: string;
    category: string;
    private _quantity: number;

    constructor(id: number, title: string, author: string, category: string, quantity: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this._quantity = quantity;
    }

    decrease(): void {
        if (this._quantity === 0) {
            throw new Error("No copies available");
        }
        this._quantity--;
    }

    increase(): void {
        this._quantity++;
    }

    getQuantity(): number {
        return this._quantity;
    }

}

