import { Person } from './../../../entities/Person';
import { IPersonRepository } from './../../../repositories/IPersonRespository';

export class ReadPersonService{
    constructor(private personRepository: IPersonRepository){}

    async runById(id: number): Promise<Person>{
        const person = await this.personRepository.findById(id); 

        if(!person){
            throw new Error("Person not found");
        }

        return person; 
    }

    async run(name?: string):Promise<Array<Person>>{
        if(name){
            return await this.personRepository.findByName(name); 
        }
        return await this.personRepository.findAll();
    }
}