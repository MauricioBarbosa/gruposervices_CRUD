import { Picture } from './../../../entities/Picture';
import { IPictureProvider } from './../../../providers/IPictureProvider';
import { IPictureRepository } from "../../../repositories/IPictureRepository";

export class DeletePictureService{
    constructor(
        private pictureRepository: IPictureRepository, 
        private pictureProvider: IPictureProvider
    ){}

    async runById(id: number): Promise<Picture>{
        const picture = await this.pictureRepository.findById(id);

        if(!picture){
            throw new Error("this picture doesn't exist");
        }

        if(await this.pictureProvider.checkIfExists(picture.filename)){
            await this.pictureProvider.delete(picture.filename) ;
        }

        return await this.pictureRepository.deletePicture(id);
    }

    async runByFileName(filename: string):Promise<boolean>{
        const fileExists = await this.pictureProvider.checkIfExists(filename);
        
        if(!fileExists){
            throw new Error("This file is not stored");
        }
        await this.pictureProvider.delete(filename);
        return true; 
    }
}