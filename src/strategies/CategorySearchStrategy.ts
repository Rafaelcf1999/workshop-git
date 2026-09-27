import { Book } from "../entities/Book.ts";
import type { SearchStrategy } from "./SearchStrategy.ts";

export class CategorySearchStrategy implements SearchStrategy{
    public search(books: Book[], query: string): Book[] {
        return books.filter((book) =>
            book.category.toLowerCase().includes(query.toLowerCase())
    );
    }
}