export class Book{
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public category: string,
        private quantity: number
    ){}
    getQuantity(): number{
        return this.quantity;
    }
    decrease(): void{
        if(this.quantity <= 0){
            throw new Error('No copies available.');
        } else {
            this.quantity--;
            return
        }
    }
    increase(): void{
        this.quantity++;
        return
    }
}