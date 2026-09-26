export class Book {
    public id: number;
    public title: string;
    public author: string;
    public category: string;
    private quantity: number;

    constructor(id: number, title: string, author: string, category: string, quantity: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.quantity = quantity;
    }

    public decrease(): void {
        if (this.quantity <= 0) {
            throw new Error("No copies available");
        } else {
            this.quantity--;
        }
    }

    public increase(): void {
        this.quantity++;
    }

    public getQuantity(): number {
        return this.quantity;
    }

}