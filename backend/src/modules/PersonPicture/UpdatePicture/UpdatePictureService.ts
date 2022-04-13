import { IPersonRepository } from './../../../repositories/IPersonRespository';
import { IPictureRepository } from './../../../repositories/IPictureRepository';
import { IPictureProvider } from '../../../providers/IPictureProvider';

import { IUpdatePictureDTO } from './IUpdatePictureDTO';

import { Picture } from '../../../entities/Picture';

export class UpdatePictureService{
    constructor(
        private pictureRepository: IPictureRepository, 
        private personRepository: IPersonRepository, 
        private pictureProvider: IPictureProvider
    ){}

    async run(picture: IUpdatePictureDTO){
        if(picture.filename.length < 4){
            throw new Error("Filename is too small")
        }

        if(picture.filename.length > 100){
            throw new Error("Filename is too big")
        }

        const person = await this.personRepository.findById(picture.person_id); 

        if(!person){
            throw new Error("This person doesn't exist");
        }

        const person_picture = await this.pictureRepository.findById(picture.person_id);

        if(!person_picture){
            throw new Error("This person doesn't have a picture")
        }

        
        await this.pictureProvider.delete(person_picture.filename);
        await this.pictureRepository.deletePicture(picture.person_id);
        return this.pictureRepository.save(new Picture({
            ...picture
        }));
    }

    async deletePicture(filename: string): Promise<void>{
        await this.pictureProvider.delete(filename);
    }
}