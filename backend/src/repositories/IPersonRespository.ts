import { Person } from './../entities/Person';

export interface IPersonRepository{
    deleteAllPersons(): Promise<void>
    save(person: Person): Promise<Person>
    checkIfExists(cpf: string): Promise<Boolean>
}