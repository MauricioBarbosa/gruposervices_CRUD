import { Request, Response } from 'express';
import { DeletePictureService } from './DeletePictureService';

export class DeletePictureControl{
    constructor(private deletePictureService: DeletePictureService){}

    async handle(request: Request, response: Response){

        const { id } = request.params; 

        try {
            if(isNaN(+id)){
                throw new Error("ID is not a number");
            }

            return response.status(200).json(await this.deletePictureService.runById(+id));
        } catch (error: any) {
            return response.status(400).json({
                message: error.message
            })
        }
    }
}