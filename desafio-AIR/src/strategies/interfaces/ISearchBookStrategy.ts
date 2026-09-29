import type Book from "../../entities/Book.ts";

export default interface ISearchBookStrategy {
  
  search(books: Book[], attr: string | number): Book[];
}
