import { Book } from '../entities/Book.js'
import type { SearchStrategy } from './SearchStrategy.js'

export class SearchByCategoryStrategy implements SearchStrategy {
    private category: string;

    constructor(category: string) {
        this.category = category;
    }

    search(books: Book[]): Book[] { // aqui minha classe vai implementar o método search da interface SearchStrategy
        return books.filter(book => book.category === this.category);
    }

}