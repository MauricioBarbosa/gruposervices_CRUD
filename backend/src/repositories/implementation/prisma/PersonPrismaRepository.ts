import { prisma } from '../../../database/prisma/client';
import { Person } from '../../../entities/Person';
import { IPersonRepository } from './../../IPersonRespository';

export class PersonPrismaRepository implements IPersonRepository{

    async deleteAllPersons(): Promise<void> {
        
    }

    async save(person: Person): Promise<Person> {
        const savedPerson = await prisma.person.create({
            data: {
                cpf: person.cpf,
                name: person.name, 
                nick: person.nick,
                address: person.address,
                gender: person.gender, 
                observations: person.observations,
                phone: person.phone
            }
        })

        return new Person(savedPerson);
    }
}