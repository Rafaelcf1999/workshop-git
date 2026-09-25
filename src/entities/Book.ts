/*Book Propriedades públicas: id (number), title (string), author (string), category (string).
A propriedade quantity (number) deve ser privada — o acesso ao estoque deve ser controlado pelos métodos da própria classe.
Método decrease(): decrementa a quantidade. Deve lançar um erro se não houver cópias disponíveis ("No copies available").
Método increase(): incrementa a quantidade.  
Método getQuantity(): retorna a quantidade atual.
*/

export class Book{
    public readonly id: number;
    public readonly title: string;
    public readonly author: string;
    public readonly category: string;
    private quantity: number;

    constructor(id:number, title:string, author:string, category: string, quantity: number){
        this.id=id;
        this.title=title;
        this.author=author;
        this.category=category;
        this.quantity=quantity;

    }

    public decrease(): void {
        if (this.quantity <= 0) {
            throw new Error("No copies available");
        }
        this.quantity -= 1;
  }

  public increase():void{
    this.quantity +=1;
  }

  public getQuantity():number{
    return this.quantity;
  }


}