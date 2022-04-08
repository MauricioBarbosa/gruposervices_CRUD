import { Person } from './../../../entities/Person';
import { IPersonRepository } from './../../../repositories/IPersonRespository';
import { ICreatePersonDTO } from './ICreatePersonDTO';

export class CreatePersonService{
    constructor(private personRepository: IPersonRepository){}

    async run(person: ICreatePersonDTO): Promise<Person>{

        if(person.name.length < 4){
            throw new Error("Person Name is too small");
        }

        if(person.name.length > 80){
            throw new Error("Person Name is too big");
        }

        if(person.cpf.length != 14){
            throw new Error("invalid cpf length")
        }

        if(!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(person.cpf)){
            throw new Error("Invalid CPF");
        }

        const personExists = await this.personRepository.checkIfExists(person.cpf); 

        if(personExists){
            throw new Error("This person already exists")
        }

        return await this.personRepository.save(new Person({
            ...person
        }));
    }
}