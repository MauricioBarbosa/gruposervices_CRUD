import { IPictureRepository } from './../../../repositories/IPictureRepository';
import { IPictureProvider } from '../../../providers/IPictureProvider';
import { Person } from './../../../entities/Person';
import { IPersonRepository } from './../../../repositories/IPersonRespository';

export class DeletePersonService{
    constructor(
        private personRepository: IPersonRepository, 
        private pictureProvider: IPictureProvider,
        private pictureRepository: IPictureRepository,
        ){}

    async run(id: number): Promise<Person>{
        const user = await this.personRepository.findById(id);

        if(!user){
            throw new Error("This person don't exist");
        }

        if(user.picture){
            if(await this.pictureProvider.checkIfExists(user.picture.filename)){
                await this.pictureProvider.delete(user.picture.filename)
            }
            await this.pictureRepository.deletePicture(id);
        }

        return await this.personRepository.deletePerson(id); 
    }
}