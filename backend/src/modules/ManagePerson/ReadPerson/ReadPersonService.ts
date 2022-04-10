import { Person } from './../../../entities/Person';
import { IPersonRepository } from './../../../repositories/IPersonRespository';

export class ReadPersonService{
    constructor(private personRepository: IPersonRepository, private pictureUrl: string){}

    async runById(id: number): Promise<Person>{
        const person = await this.personRepository.findById(id); 

        if(!person){
            throw new Error("Person not found");
        }

        person.picture.url = this.pictureUrl + '/' + person.picture.filename;

        return person; 
    }

    async run(name?: string):Promise<Array<Person>>{
        let persons: Array<Person>;

        if(name){
            persons =  await this.personRepository.findByName(name); 
        }else{
            persons = await this.personRepository.findAll();
        }

        return persons.map(person => {
            if(person.picture){
                person.picture.url = this.pictureUrl + '/' + person.picture.filename
            }

            return {
                ...person
            }
        })
    }
}