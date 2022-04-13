import { ISingleFileHandlerProvider } from './../../../providers/ISingleFileHandlerProvider';
import { Request, Response } from 'express';
import { StorePictureService } from './StorePictureService'; 

export class StorePictureControl{
    constructor(
        private storePictureService: StorePictureService, 
        private upload: any
    ){

    }

    async handle(request: Request, response: Response){
        this.upload(request, response, async(error)=>{

            const { id } = request.params; 

            try {
                if(error){
                    throw new Error(error.message);
                }  

                if(!request.file) {
                    throw new Error("No such file uploaded")
                }

                return response.status(200).json(await this.storePictureService.run({
                    filename: request.file.filename,
                    originalname: request.file.originalname, 
                    person_id: +id
                }))
            } catch (error) {
                return response.status(400).json({
                    message: error.message
                })
            }
        }) 
    }

}