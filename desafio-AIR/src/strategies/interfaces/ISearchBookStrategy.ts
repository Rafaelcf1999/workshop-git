import type Book from "../../entities/Book.js";

export default interface ISearchBookStrategy {
  
  search(books: Book[], attr: string | number): Book[];
}
