import { IPersonRepository } from './../../../repositories/IPersonRespository';
import { ICreatePersonDTO } from './ICreatePersonDTO';

export class CreatePersonService{
    constructor(private personRepository: IPersonRepository){}

    async run(person: ICreatePersonDTO){

        if(person.name.length < 4){
            throw new Error("Person Name is too small");
        }

        if(person.name.length > 80){
            throw new Error("Person Name is too big");
        }

        if(person.cpf.length != 14){
            throw new Error("invalid cpf length")
        }
    }
}