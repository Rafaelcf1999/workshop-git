export default class Book {
    id: number;
    title: string;
    author: string;
    category: string;
    private quantity: number;

    constructor(id: number, title: string, author: string, category: string, quantity: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.quantity = quantity;
    }

    decrease() : void {
        if (this.quantity <= 0) {
            throw new Error("No copies available");
        }
        this.quantity--;
    }

    increase() : void {
        this.quantity++;
    }

    getQuantity() : number {
        return this.quantity;
    }
}