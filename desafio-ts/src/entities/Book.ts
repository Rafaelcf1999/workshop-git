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
    };

    //Método decrease(): decrementa a quantidade. Deve lançar um erro se não houver cópias disponíveis ("No copies available").//
    decrease() : void {
        if (this.quantity <= 0) {
            throw new Error("No copies available");
        }
        this.quantity--;
    };

    //Método increase(): incrementa a quantidade.//
    increase() : void {
        this.quantity++;
    };

    //Método getQuantity(): retorna a quantidade atual.//
    getQuantity() : number {
        return this.quantity;
    };
};