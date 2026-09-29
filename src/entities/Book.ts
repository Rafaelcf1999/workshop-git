export default class Book{

    constructor(
        public id: number,
        public title: string,
        public author: string,
        public category: string,
        private _quantity: number
    ){
        if(this._quantity < 0){
            throw new Error("Quantity cannot be negative")
        }
    };

    decrease(): void{
        if(this._quantity <= 0){
            throw new Error("No copies available");
        }

        this._quantity--;
    }

    increase(): void{
        this._quantity++;
    }

    get quantity(): number{
        return this._quantity
    }
    
}