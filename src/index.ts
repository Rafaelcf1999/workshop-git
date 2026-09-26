import { BookRepository } from "./repositories/BookRepository.ts";
import { Book } from "./entities/Book.ts";

const testeRepo = new BookRepository();
const testeBook = new Book(99, "teste", "autor", "categoria", 1);

testeRepo.save(testeBook);
console.log(testeRepo.findById(99));
try{
    testeRepo.save(testeBook);
}catch(e){
    console.log((e as Error).message);
}