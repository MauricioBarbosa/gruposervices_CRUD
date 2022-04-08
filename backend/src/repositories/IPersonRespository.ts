import { Person } from './../entities/Person';

export interface IPersonRepository{
    save(person: Person): Promise<Person>
    createMany(persons: Array<Person>): Promise<void>

    checkIfExists(cpf: string): Promise<Boolean>
    findById(id: number): Promise<Person | null>
    findAll(): Promise<Array<Person>>
    findByName(name: string): Promise<Array<Person>>
    
    deleteAllPersons(): Promise<void>
    deletePerson(id: number): Promise<Person>
}