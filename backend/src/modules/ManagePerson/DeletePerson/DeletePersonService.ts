import { Person } from './../../../entities/Person';
import { IPersonRepository } from './../../../repositories/IPersonRespository';

export class DeletePersonService{
    constructor(private personRepository: IPersonRepository){}

    async run(id: number): Promise<Person>{
        const userExists = await this.personRepository.findById(id);

        if(!userExists){
            throw new Error("This person don't exist");
        }

        return await this.personRepository.deletePerson(id); 
    }
}