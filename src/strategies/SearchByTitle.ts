import type Book from "../entities/Book.ts";
import type SearchStrategy from "./SearchStrategy.ts";

/**
 * A classe SearchByTitle implementa a interface SearchStrategy para realizar buscas de livros com base no título.
 * Ela define o método search, que recebe uma lista de livros e um termo de busca, e retorna uma lista de livros cujo título contém o termo fornecido.
 * @method search(items: Book[], term: string): Book[] - Realiza a busca de livros pelo título, filtrando os livros cujo título contém o termo fornecido.
 * @param items A lista de livros a ser pesquisada.
 * @param term O termo de busca a ser utilizado para filtrar os livros pelo título.
 * @returns Uma lista de livros cujo título contém o termo fornecido.
 */
export default class SearchByTitle implements SearchStrategy<Book> {
    search(items: Book[], term: string): Book[] {
        return items.filter((book) => book.title.includes(term));
    }
}