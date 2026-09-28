export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public category: string,
    private quantity: number,
  ) {}

  public decrease(): void {
    if (this.quantity <= 0) {
      throw new Error("No copies available");
    }

    this.quantity--;
  }

  public increase(): void {
    this.quantity++;
  }

  public getQuantity(): number {
    return this.quantity;
  }
}
