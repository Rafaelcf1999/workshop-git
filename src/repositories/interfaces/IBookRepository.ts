/*definir save; findById; findAll; para o repositório*/
import {Book} from "../../entities/Book.ts";

export interface IBookRepository{

    save(book:Book): void;
    findById(id:number):Book;
    findAll():Book[];
}