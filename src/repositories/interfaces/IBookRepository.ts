//deve definir os contratos: save(sem retorno), findById(retorna o lirvo correspondente), findAll(retorna uma lista contendo todos os livros)

import { Book } from  "../../entities/Book.ts";

export interface IBookRepository{
    save(book: Book): void;
    findById(id: number): Book;
    findAll(): Book[];
}