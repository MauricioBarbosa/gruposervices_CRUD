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

        if(person.nick.length > 80){
            throw new Error("Nick name is too big")
        }

        if(person.address.length > 80){
            throw new Error("Address is too big");
        }

        if(person.gender.length > 20){
            throw new Error("Gender is too big")
        }

        if(person.observations.length > 100){
            throw new Error("Observation is too big");
        }

        if(person.phone.length > 15){
            throw new Error("Phone number is too big")
        }

        if(!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(person.cpf)){
            throw new Error("Invalid CPF");
        }

        return await this.personRepository.save(new Person({
            ...person
        }));
    }
}