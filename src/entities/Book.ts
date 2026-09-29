export default class Book {
  constructor(
  public readonly id: number,
  public readonly title: string,
  public readonly author: string,
  public readonly category: string,
  private quantity: number
  ) {
  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new Error('Quantity must be a non-negative integer');
    }
  }

  public decrease(): void {
    if (this.quantity <= 0) {
      throw new Error('No copies available');
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