//propriedades públicas : id(number), title(string), author(string), category(string)
//propriedade privada: quantity(number)
//métodos: decrease(), increase(), getQuantity

export class Book{
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public category: string,
        private quantity: number
    ){}

    public decrease(): void{
        if(this.quantity <= 0){
            throw new Error("No copies available");
        }
        this.quantity -= 1;
    }

    public increase(): void{
        this.quantity += 1;
    }

    public getQuantity(): number{
        return this.quantity;
    }
}