export default class Book {
  constructor(
    public readonly id: number,
    public title: string,
    public author: string,
    public category: string,
    public quantity: number,
  ) {}

  decrease() {
    if (this.quantity > 0) {
      this.quantity--;
    } else {
      throw new Error('No copies available');
    }
  }

  increase() {
    this.quantity++;
  }

  getQuantity() {
    return this.quantity;
  }
}
