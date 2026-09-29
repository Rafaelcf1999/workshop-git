import type Book from "../entities/Book.ts";
import type ISearchBookStrategy from "./interfaces/ISearchBookStrategy.ts";

export class SearchBookByCategory implements ISearchBookStrategy {

  search(books: Book[], category: string): Book[] {
    const listBooks =  books.filter((book) => book.category.toLowerCase() === category.toLowerCase());

     if (listBooks.length === 0) {
      throw new Error('Não ha livro cadastrado com esse autor');
    }

    return listBooks;
  }
}