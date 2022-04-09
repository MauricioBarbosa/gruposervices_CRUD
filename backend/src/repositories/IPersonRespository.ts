import { Person } from './../entities/Person';

export interface IPersonRepository{
    save(person: Person): Promise<Person>
    createMany(persons: Array<Person>): Promise<void>

    findById(id: number): Promise<Person | null>
    findAll(): Promise<Array<Person>>
    findByName(name: string): Promise<Array<Person>>

    update(person: Person): Promise<Person>
    
    deleteAllPersons(): Promise<void>
    deletePerson(id: number): Promise<Person>
}