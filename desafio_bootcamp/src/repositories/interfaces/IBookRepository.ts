import { Book } from "../../entities/Book.ts";
import type { IRepository } from './IRepository.ts';

export interface IBookRepository extends IRepository<Book> {

    findById(id:number):Book;
   
}