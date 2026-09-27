export class Book {
  private quantity: number;

  constructor(
    public id: number,
    public title: string,
    public author: string,
    public category: string,
    quantity: number
  ) {
    this.quantity = quantity;
  }

  decrease(): void {
    if (this.quantity <= 0) {
      throw new Error("No copies available");
    }
    this.quantity--;
  }

  increase(): void {
    this.quantity++;
  }

  getQuantity(): number {
    return this.quantity;
  }
}