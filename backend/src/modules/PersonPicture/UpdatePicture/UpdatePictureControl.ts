import { Request, Response } from 'express';
import { UpdatePictureService } from './UpdatePictureService'; 

export class UpdatePictureControl{
    constructor(
        private updatePictureService: UpdatePictureService, 
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

                if(isNaN(+id)){
                    await this.updatePictureService.deletePicture(request.file.filename);
                    throw new Error("ID is not a number")
                }

                return response.status(200).json(await this.updatePictureService.run({
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