import app from "../../../../app"; 
import request from "supertest"; 

import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";

import { Person } from "../../../entities/Person";
import { Picture } from "../../../entities/Picture";
import appConfig from "../../../config/appConfig";

let personPrismaRepository: PersonPrismaRepository;
let picturePrismaRepository: PicturePrismaRepository; 

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
})

describe("Testing ReadPersonControl by ID", ()=>{

    let person: Person; 
    let picture: Picture;

    beforeAll(async ()=>{
        await picturePrismaRepository.deleteAllPictures();
        await personPrismaRepository.deleteAllPersons();

        person = await personPrismaRepository.save(
            new Person({
                address: "",
                cpf: "518.800.600-60",
                gender: "Male", 
                name: "Micael Belchior Castilho",
                nick: "Micael",
                observations: "None",
                phone: "(15) 3422-6322"
            })
        );

        picture = await picturePrismaRepository.save(
            new Picture({
                filename: '1643077746437_18223.jpg',
                originalname: 'file.jpg',
                person_id: person.id
            })
        )
    })

    it("Should return a person not found error", async ()=>{
        const response = await request(app).get("/person/").send({
            id: person.id+1
        })

        expect(response.status).toBe(400); 
        expect(response.body).toEqual({
            message: "Person not found"
        })
    })

    it("Should return a person", async ()=>{
        const response = await request(app).get("/person/").send({
            id: person.id
        })

        expect(response.status).toBe(200); 
        expect(response.body).toEqual(expect.objectContaining({
                id: person.id,
                address: "",
                cpf: "518.800.600-60",
                gender: "Male", 
                name: "Micael Belchior Castilho",
                nick: "Micael",
                observations: "None",
                phone: "(15) 3422-6322", 
                picture: {
                    url: appConfig.pictureUrl + '/' + picture.filename,
                    filename: '1643077746437_18223.jpg',
                    originalname: 'file.jpg',
                    person_id: person.id
                }          
            }));
    })
})

