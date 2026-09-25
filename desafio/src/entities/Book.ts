export default class Book {
    
    constructor(
        public id: number, 
        public title: string,
        public author: string,
        public category: string,
        private _quantity: number
    ){}

    decrease(): void {
        if(this.isEmpty()){
            throw new Error('Não há mais exemplares deste livro');
        }
        this._quantity--;
    }

    private isEmpty(): boolean {
        return this._quantity == 0;
    }

    increase(): void { 
        this._quantity++;
    }

    getQuantity(): number {
        return this._quantity;
    }
}