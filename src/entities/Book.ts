export default class Book{
    
    constructor(
        public readonly id: number,
        public title: string,
        public author: string,
        public category: string,
        private _quantity: number
    ){}

    public decrease(): void{
        if(this._quantity <= 0){
            throw new Error ('No copies available');
        }

        this._quantity--;
    }

    public increase(): void{
        this._quantity++;
    }

    public getQuantity(): number{
        return this._quantity;
    }
}