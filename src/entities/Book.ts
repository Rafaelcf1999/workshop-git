/**
 * Entidade que representa um Livro no sistema.
 */
export default class Book {
    private static instanceId: number = 1;
    public readonly id = Book.instanceId++;

    constructor(
        public title: string, 
        public author: string, 
        public category: string,
        private _quantity:number
    ) {}

    descrease(): void {
        if (this._quantity <= 0) {
            throw new Error("No copies available");
        }
        this._quantity--;
    }
    increase():void{
        this._quantity++;
    }
    get quantity(): number{
        return this._quantity;
    };
}