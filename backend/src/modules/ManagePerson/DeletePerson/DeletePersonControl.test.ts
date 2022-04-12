import app from "../../../../app"; 
import request from "supertest"; 

import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { Person } from "../../../entities/Person";
import { Picture } from "../../../entities/Picture";

let personPrismaRepository: PersonPrismaRepository;
let picturePrismaRepository: PicturePrismaRepository;

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
})

describe("Testing DeletePersonControl", ()=>{
    
    let person: Person;
    let personWithPicture: Person;
    

    beforeAll(async ()=>{
        await picturePrismaRepository.deleteAllPictures();
        await personPrismaRepository.deleteAllPersons();
        const personData = {
            address: "",
            cpf: "663.473.726-65",
            gender: "Female", 
            name: "Benedita da Silva",
            nick: "Benedita",
            observations: "None",
            phone: "+55 9555328494"
        }
        person = await personPrismaRepository.save(new Person({
            ...personData
        }))

        const personWithPictureData = {
            address: "Rua dos Aimorés",
            cpf: "663.433.726-65",
            gender: "Female", 
            name: "Rogélia Pereira Neto",
            nick: "Rogélia",
            observations: "None",
            phone: "+55 9555328494"
        }
    })

    it("Should throw a Person doesn't exist error", async ()=>{
        const response = await request(app).delete(`/person/${person.id+2}`); 

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "This person don't exist"
        })
    })

    it("Should delete a user", async ()=>{
        await request(app).delete(`/person/${person.id}`);
        const response = await request(app).delete(`/person/${person.id}`);
        
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "This person don't exist"
        })
    })
})