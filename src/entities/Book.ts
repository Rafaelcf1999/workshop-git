export default class Book{

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
        if(this.getQuantity() <= 0){
            throw new Error("No copies available");
        }
        this.quantity--;
    }

    increase(): void{
        this.quantity++;
    }
}
