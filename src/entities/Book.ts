export class Book {
    public title: string;
    public author: string;
    public id: number;
    public category: string;
    private quantity: number;

    constructor(title: string, author: string, id: number, category: string, quantity: number) {
        this.title = title;
        this.author = author;
        this.id = id;
        this.category = category;
        this.quantity = quantity;
    }

    public decrease(): void {
        if (this.quantity == 0) {
            throw new Error("No copies available.");
        }
        this.quantity -= 1;
    }

    public increase(): void {
        this.quantity += 1;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}
