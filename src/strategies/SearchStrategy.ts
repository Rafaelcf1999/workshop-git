import { Book } from '../entities/Book.js'

export interface SearchStrategy {
    search(books: Book[]): Book[];
}

