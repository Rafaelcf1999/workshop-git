export default interface IRepositoryValidation<T> {
    verifyIdExists(objectToSave: T, objects: T[]): boolean;
    isEmpty(objects: T[]): boolean;
}