import type Book from "../entities/Book.ts";
import type SearchStrategy from "./SearchStrategy.ts";

/**
 * A classe SearchByCategory implementa a interface SearchStrategy para realizar buscas de livros com base na categoria.
 * Ela define o método search, que recebe uma lista de livros e um termo de busca, e retorna uma lista de livros cuja categoria contém o termo fornecido.
 * @method search(items: Book[], term: string): Book[] - Realiza a busca de livros pela categoria, filtrando os livros cuja categoria contém o termo fornecido.
 * @param items A lista de livros a ser pesquisada.
 * @param term O termo de busca a ser utilizado para filtrar os livros pela categoria.
 * @returns Uma lista de livros cuja categoria contém o termo fornecido.
 */
export default class SearchByCategory implements SearchStrategy<Book> {
    search(items: Book[], term: string): Book[] {
       return items.filter(book => book.category.includes(term));
    }
}