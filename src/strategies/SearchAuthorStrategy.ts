import type SearchStrategy from "./ISearch.js";
import {Book} from '.././entities/Book.js';

export default class AuthorSearchStrategy implements SearchStrategy {
  search(books: Book[], query: string): Book[] {
    const results: Book[] = [];

    for (const book of books) {
      if (book.author.includes(query)) {
        results.push(book); 
        }
    }

    return results;
  }
}