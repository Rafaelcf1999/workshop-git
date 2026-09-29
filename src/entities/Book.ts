/**
 * Representa a entidade Livro no domínio da biblioteca.
 */
export class Book {
  public id: number;
  public title: string;
  public author: string;
  public category: string;
  private quantity: number;

  constructor(
    id: number,
    title: string,
    author: string,
    category: string,
    quantity: number
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = category;
    this.quantity = Math.max(0, quantity);
  }

  /**
   * Decrementa a quantidade de exemplares disponíveis no estoque.
   * @throws {Error} Se não houver cópias disponíveis ("No copies available").
   */
  public decrease(): void {
    if (this.quantity <= 0) {
      throw new Error("No copies available");
    }
    this.quantity -= 1;
  }

  /**
   * Incrementa a quantidade de exemplares disponíveis no estoque.
   */
  public increase(): void {
    this.quantity += 1;
  }

  /**
   * Retorna a quantidade atual de cópias em estoque.
   */
  public getQuantity(): number {
    return this.quantity;
  }
}
