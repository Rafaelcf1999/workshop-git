export default class Book {

    constructor(
        public id: number,
        public title: string,
        public author: string,
        public category: string,
        private quantity: number
    ) {}

    decrease() {
        if(this.quantity <= 0) {
            throw new Error("No copies available")
        }
        this.quantity--
    }

    increase() {
        this.quantity++
    }

    getQuantity(): number {
        return this.quantity
    }
}