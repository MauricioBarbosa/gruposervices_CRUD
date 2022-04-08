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

    async checkIfExists(cpf: string): Promise<Boolean> {
        const foundPerson = await prisma.person.findFirst({
            where: {
                cpf: cpf
            }
        });

        console.log(foundPerson);

        return !!foundPerson;
    }

    async deleteAllPersons(): Promise<void> {
        await prisma.person.deleteMany({});
    }
}