import Book from "../entities/Book";
import ISearchStrategy from "./interfaces/ISearchStrategy";

class SerachByCategory implements ISearchStrategy {

    constructor(private readonly category: string){

    }

    search(books: Book[]): Book[] {
        return books.filter((books) => books.category.toLowerCase() === this.category.toLowerCase())
    }
    
}

export default SerachByCategory;