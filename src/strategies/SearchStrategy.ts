import { Book } from '../entities/Book.ts'

export interface SearchStrategy {
    search(books: Book[]): Book[];
}

