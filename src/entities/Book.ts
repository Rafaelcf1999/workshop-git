class Book {
    public readonly id: number;
    public readonly title: string;
    public readonly author: string;
    public readonly category: string;
    private quantity: number;

    constructor(id: number, title: string, author: string, category: string, quantity: number) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.category = category;
        this.quantity = quantity;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public decrease(): void {
        if (this.quantity <= 0) {
            throw new Error("No copies available");
        }

        this.quantity--;
    }

    public increase(): void {
        this.quantity++;
    }
}

export default Book;