import Book from "../../entities/Book";

interface ISearchStrategy {

    search(books: Book[]): Book[]

}

export default ISearchStrategy;