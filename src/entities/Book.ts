class Book {
    public id: number
    public title: string
    public author: string
    public category: string
    private quantity: number

    constructor(id:number, title: string, author: string, category: string, quantity: number){
        this.id = id
        this.author = author
        this.title = title
        this.category = category
        this.quantity = quantity
    }

    getQuantity(){
        return this.quantity
    }

    decrease(){
        if(this.quantity <= 0){
            throw new Error("No copies available")
        }
        this.quantity--
    }

    increase(){
        this.quantity++
    }

}

export default Book;