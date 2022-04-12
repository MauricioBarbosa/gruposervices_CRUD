import { Request, Response } from 'express';
import { DeletePersonService } from './DeletePersonService';

export class DeletePersonControl{
    constructor(private deletePersonService: DeletePersonService){}

    async handle(request: Request, response: Response){

        const { id } = request.params; 

        try {
            return response.status(200).json(await this.deletePersonService.run(+id))
        } catch (error: any) {
            return response.status(400).json({
                message: error.message
            })
        }
    }

}