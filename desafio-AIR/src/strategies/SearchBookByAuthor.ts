import type Book from "../entities/Book.js";
import type ISearchBookStrategy from "./interfaces/ISearchBookStrategy.js";

export default class SearchBookByAuthor implements ISearchBookStrategy {

  search(books: Book[], author: string): Book[] {
    const listBooks =  books.filter((book) => book.author.toLowerCase() === author.toLowerCase());

    if (listBooks.length === 0) {
      throw new Error('Não ha livro cadastrado com esse autor');
    }

    return listBooks;
  }
}