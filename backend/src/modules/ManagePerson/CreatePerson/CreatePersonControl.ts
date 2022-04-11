import { Request, Response } from 'express';
import { CreatePersonService } from './CreatePersonService';

export class CreatePersonControl{
    constructor(private createPersonService: CreatePersonService){}

    async handle(request: Request, response: Response){

        const { 
            name, 
            cpf, 
            nick, 
            gender, 
            phone, 
            address,
            observations 
        } = request.body; 

        try {
            if(!name){
                throw new Error("Name not informed")
            }

            return response.status(200);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message
            });   
        }

    }

}