
/**
 * BaseRepository é uma interface genérica que define os métodos
 * básicos de um repositório para as operações, como save, findById e findAll, 
 * visto que os repositórios possuiam operações semelhantes.
 * @method save(objectToSave: T): T - Salva um objeto do tipo T no repositório e retorna o objeto salvo.
 * @method findById(id: number): T - Busca um objeto do tipo T no repositório pelo seu ID e retorna o objeto encontrado.
 * @method findAll(): T[] - Retorna todos os objetos do tipo T presentes no repositório.
 */
export default interface BaseRepository<T> {
    save(objectToSave: T): T;
    findById(id: number): T;
    findAll(): T[];
}