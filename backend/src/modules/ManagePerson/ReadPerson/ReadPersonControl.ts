import { Request, Response } from 'express';
import { ReadPersonService } from "./ReadPersonService";

export class ReadPersonControl{
    constructor(private readPersonService: ReadPersonService){}

    async handle(request: Request, response: Response){
        const { id, name }  = request.body; 

        try {
            let persons; 

            if(id){
                persons = await this.readPersonService.runById(+id);
            }
            return response.status(200).json(persons);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message
            });
        }
    }
}