export class Book{
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public category: string,
        private _quantity: number
    ){}
    get quantity(): number{
        return this._quantity;
    }
    decrease(): void{
        if(this._quantity <= 0){
            throw new Error('No copies available');
        } else {
            this._quantity--;
            return
        }
    }
    increase(): void{
        this._quantity++;
        return
    }
}