import { Request, Response } from 'express';
import { ReadPersonService } from "./ReadPersonService";

export class ReadPersonControl{
    constructor(private readPersonService: ReadPersonService){}

    async handle(request: Request, response: Response){
        const { id, src }  = request.body; 

        try {
            let persons; 

            if(id){
                persons = await this.readPersonService.runById(+id);
            }else{
                persons = await this.readPersonService.run(src);
            }
            return response.status(200).json(persons);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message
            });
        }
    }
}