import type BaseRepository from "./BaseRepository.ts";
import type Book from "../../entities/Book.ts";


export default interface IBookRepository extends BaseRepository<Book> {
    
}