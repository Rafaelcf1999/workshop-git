import { Book } from '../entities/Book.ts'
import type { SearchStrategy } from './SearchStrategy.ts'

export class SearchByCategoryStrategy implements SearchStrategy {
    private category: string;

    constructor(category: string) {
        this.category = category;
    }

    search(books: Book[]): Book[] { // aqui minha classe vai implementar o método search da interface SearchStrategy
        return books.filter(book => book.category === this.category);
    }

}