import { Request, Response } from 'express';
import { ReadPersonService } from "./ReadPersonService";

export class ReadPersonControl{
    constructor(private readPersonService: ReadPersonService){}

    async handle(request: Request, response: Response){
        const { src, id }  = request.query; 

        try {
            let persons; 

            if(id){
                if(isNaN(+id)){
                    throw new Error("Invalid ID");
                }
                persons = await this.readPersonService.runById(+id);
            }else{ 
                persons = await this.readPersonService.run(src ? src.toString() : null);
            }
            return response.status(200).json(persons);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message
            });
        }
    }
}