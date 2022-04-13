import { IPictureProvider } from './../../../providers/IPictureProvider';
import { IPersonRepository } from './../../../repositories/IPersonRespository';
import { IStorePictureDTO } from './IStorePictureDTO';
import { IPictureRepository } from './../../../repositories/IPictureRepository';
import { Picture } from '../../../entities/Picture';

export class StorePictureService{
    constructor(
        private pictureRepository: IPictureRepository, 
        private personRepository: IPersonRepository,
        private pictureProvider: IPictureProvider
    ){}

    async run(picture: IStorePictureDTO): Promise<Picture>{
        try {
            if(picture.filename.length < 4){
                throw new Error("Filename is too small")
            }
    
            if(picture.filename.length > 100){
                throw new Error("Filename is too big")
            }
    
            if(picture.originalname.length > 100){
                throw new Error("Originalname is too big")
            }
    
            const person = await this.personRepository.findById(picture.person_id); 
    
            if(!person){
                throw new Error("This person doesn't exist");
            }
    
            return await this.pictureRepository.save(new Picture({
                ...picture
            }));   
        } catch (error: any) {
            await this.pictureProvider.delete(picture.filename);
            throw new Error(error.message); 
        }
    }

    async deletePicture(filename: string): Promise<void>{
        await this.pictureProvider.delete(filename);
    }
}