import type BaseRepository from "./BaseRepository.ts";
import type Book from "../../entities/Book.ts";
import SearchStrategy from "../../strategies/SearchStrategy.ts";

/**
 * IBookRepository é a interface responsável por definir os métodos específicos para o repositório de livros,
 * estendendo a interface BaseRepository para herdar os métodos básicos de um repositório.
 * @method save(objectToSave: Book): Book - Salva um livro no repositório e retorna o livro salvo.
 * @method findById(id: number): Book - Busca um livro no repositório pelo seu ID e retorna o livro encontrado.
 * @method findAll(): Book[] - Retorna todos os livros presentes no repositório.
 * @method search(strategy: SearchStrategy<Book>, term: string): Book[] - Realiza uma busca no repositório utilizando uma estratégia de busca fornecida e um termo de pesquisa, retornando os livros encontrados.
 */
export default interface IBookRepository extends BaseRepository<Book> {
    search(strategy: SearchStrategy<Book>, term: string): Book[];
}