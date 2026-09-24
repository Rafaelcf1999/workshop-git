import SearchStrategy from "./SearchStrategy";
import Book from "../entities/Book";

export default class SearchCategoryStrategy implements SearchStrategy {

    constructor(private readonly category: string) {
    }
    filtrar(books: Book[]): Book[] {
        return books.filter((books) => books.category === this.category)
    }

}