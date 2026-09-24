import Book from "#entities/Book";
import BaseRepository from "#repositories/interfaces/BaseRepository";

export default interface IBookRepository extends BaseRepository<Book> {
    
}