import { prisma } from '../../../database/prisma/client';
import { Person } from '../../../entities/Person';
import { IPersonRepository } from './../../IPersonRespository';

export class PersonPrismaRepository implements IPersonRepository{

    async save(person: Person): Promise<Person> {
        const savedPerson = await prisma.person.create({
            data: {
                ...person
            }
        })

        return new Person(savedPerson);
    }

    async createMany(persons: Person[]): Promise<void> {
        await prisma.person.createMany({
            data: persons.map((person)=>{
                return {
                    ...person
                }
            })
        })
    }

    async findById(id: number): Promise<Person | null> {
        const foundPerson = await prisma.person.findUnique({
            where: {
                id: id
            }
        }); 

        if(foundPerson){
            return new Person({
                ...foundPerson
            })
        }

        return null; 
    }

    async findAll(): Promise<Person[]> {
        const persons = await prisma.person.findMany(); 

        return persons.map((person)=>{
            return new Person({
                ...person
            })
        })
    }

    async findByName(name: string): Promise<Person[]> {
        const persons = await prisma.person.findMany({
            where: {
                name: {
                    startsWith: name
                }
            }
        })
        
        return persons.map((person)=>{
            return new Person({
                ...person
            })
        })
    }

    async update(person: Person): Promise<Person> {
        const updatedPerson = await prisma.person.update({
            where: {
                id: person.id
            }, 
            data: {
                ...person
            }
        })

        return new Person({
            ...updatedPerson
        });
    }

    async deletePerson(id: number): Promise<Person> {
        const deletedPerson = await prisma.person.delete({
            where: {
                id: id
            }
        }); 

        return new Person({
            ...deletedPerson
        });
    }

    async deleteAllPersons(): Promise<void> {
        await prisma.person.deleteMany({});
    }
}