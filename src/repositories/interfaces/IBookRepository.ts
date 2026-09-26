import Book from "../../entities/Book";

interface IBookRepository {
    save(book: Book):void

    findById(id:number):Book 

    findAll(): Book[]
        
}

export default IBookRepository;