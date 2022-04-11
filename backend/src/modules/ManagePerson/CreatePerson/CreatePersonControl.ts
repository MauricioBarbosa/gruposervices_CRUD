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

            if(!cpf){
                throw new Error("CPF not informed")
            }

            return response.status(200).json(await this.createPersonService.run({
                address: address? address : "", 
                cpf: cpf, 
                gender: gender? gender: "", 
                name: name, 
                nick: nick? nick : "",
                observations: observations? observations : "",
                phone: phone ? phone : ""
            }));
        } catch (error: any) {
            return response.status(400).json({
                message: error.message
            });   
        }

    }

}