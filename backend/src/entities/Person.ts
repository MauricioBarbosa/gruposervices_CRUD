import { Picture } from "./Picture";

export class Person{
    public readonly id: number; 
    public cpf: string; 
    public name: string;
    public nick: string; 
    public gender: string; 
    public phone: string; 
    public address: string; 
    public observations: string; 
    public createdAt: Date; 
    public updatedAt: Date; 
    public picture: Picture;

    constructor(
        props: Omit<Person, 'id'|'createdAt'|'updatedAt'|'picture'>, 
        createdAt?: Date, updatedAt?: Date, id?: number){
            Object.assign(this, props); 

            if(id){
                this.id = id; 
            }

            if(createdAt){
                this.createdAt = createdAt; 
            }

            if(updatedAt){
                this.updatedAt = updatedAt; 
            }
        }
}