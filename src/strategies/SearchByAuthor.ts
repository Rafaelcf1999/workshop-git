import type Book from "../entities/Book.ts";
import type SearchStrategy from "./SearchStrategy.ts";

/**
 * A classe SearchByAuthor implementa a interface SearchStrategy para realizar buscas de livros com base no autor.
 * Ela define o método search, que recebe uma lista de livros e um termo de busca, e retorna uma lista de livros cujo autor contém o termo fornecido.
 * @method search(items: Book[], term: string): Book[] - Realiza a busca de livros pelo autor, filtrando os livros cujo autor contém o termo fornecido.
 * @param items A lista de livros a ser pesquisada.
 * @param term O termo de busca a ser utilizado para filtrar os livros pelo autor.
 * @returns Uma lista de livros cujo autor contém o termo fornecido.
 */
export default class SearchByAuthor implements SearchStrategy<Book> { 
    search(items: Book[], term: string): Book[] {
        return items.filter(book => book.author.includes(term));
    }
}