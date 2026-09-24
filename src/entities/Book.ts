export default class Book {
    constructor(
        public id: number, 
        public title: string, 
        public author: string, 
        public category: string,
        private _quantity:number
    ) {}

    descrease():void{}
    increase():void{}
    get quantity(): number{
        return this._quantity;
    };
}