import app from "../../../../app"; 
import request from "supertest"; 
import { resolve } from "path";

import { Person } from "../../../entities/Person";
import { Picture } from "../../../entities/Picture";
import { PictureProviderImplementation } from "../../../providers/deletepicture/PictureProviderImplementation";
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";

let picturePrismaRepository: PicturePrismaRepository;
let personPrismaRepository: PersonPrismaRepository;
let pictureProviderImplementation: PictureProviderImplementation

const uploadPicFolder = resolve(__dirname, '..', '..', '..', '..', 'uploads', 'pictures');

/**
 * Must put a file manually in this test
 */

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
    pictureProviderImplementation = new PictureProviderImplementation();
})

describe("Testing DeletePictureControl", ()=>{

    let person: Person;
    let picture: Picture;

    beforeAll(async ()=>{
        await picturePrismaRepository.deleteAllPictures();
        await personPrismaRepository.deleteAllPersons();

        person = await personPrismaRepository.save(new Person({
            address: "Rua Dos Sabiás, Nº 142, São Paulo, Brasil",
            cpf: "646.139.870-83",
            gender: "Female", 
            name: "Belma Dolores Alves",
            nick: "Dolores",
            observations: "None",
            phone: "(12) 3717-9117"
        }));
        
        picture = await picturePrismaRepository.save(new Picture({
            filename: "1649891524636_19676.jpg",
            originalname: "belma_dolores.jpg",
            person_id: person.id
        }));
    })

    it("Should return invalid id message", async()=>{
        const response = await request(app).delete(`/person/picture/josé`)
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "ID is not a number"
        })
    })

    it("Should return a picture not exists error", async ()=>{
        const response = await request(app).delete(`/person/picture/${person.id+1}`)
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "this picture doesn't exist"
        })
    })

    it("Should remove a picture", async ()=>{
        const response = await request(app).delete(`/person/picture/${person.id}`) 

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            filename: "1649891524636_19676.jpg",
            originalname: "belma_dolores.jpg",
            person_id: person.id
        });
    })
})
