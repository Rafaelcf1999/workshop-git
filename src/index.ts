import { BookRepository } from "./repositories/BookRepository.ts";
import { Book } from "./entities/Book.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { User } from "./entities/User.ts";

//test BookRepository
const testeRepo = new BookRepository();
const testeBook = new Book(99, "teste", "autor", "categoria", 1);

testeRepo.save(testeBook);
console.log(testeRepo.findById(99));
try{
    testeRepo.save(testeBook);
}catch(e){
    console.log((e as Error).message);
}

//test UserRepository
const testUserRepo = new UserRepository();
const testUser = new User(99, "Usuário Teste");
testUserRepo.save(testUser);
console.log(testUserRepo.findById(99));
try {
    testUserRepo.save(testUser);
} catch (e) {
    console.log((e as Error).message);
}