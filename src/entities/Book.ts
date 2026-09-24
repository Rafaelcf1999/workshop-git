export default class Book {

    constructor(
        public id: number,
        public title: string,
        public author: string,
        public category: string,
        private quantity: number
    ) {}

    decrease() {
        this.quantity--
    }

    increase() {
        this.quantity++
    }

    getQuantity(): number {
        return this.quantity
    }
}