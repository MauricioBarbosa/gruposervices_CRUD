import app from "../../../../app"; 
import request from "supertest"; 
import { resolve } from "path";
import fs from 'fs/promises'

import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { PictureProviderImplementation } from '../../../providers/deletepicture/PictureProviderImplementation';
import { Person } from "../../../entities/Person";
import { Picture } from "../../../entities/Picture";

let picturePrismaRepository: PicturePrismaRepository;
let personPrismaRepository: PersonPrismaRepository;
let pictureProviderImplementation: PictureProviderImplementation

const uploadPicFolder = resolve(__dirname, '..', '..', '..', '..', 'uploads', 'pictures');
const fileTestPath = resolve(__dirname, '..', '..', '..', '..', 'img-test'); 

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
    pictureProviderImplementation = new PictureProviderImplementation();
})

describe("testing UpdatePictureControl with multer", ()=>{
    let person1: Person;
    let person2: Person; 

    beforeAll(async ()=>{
        await fs.readdir(uploadPicFolder).then((f) => Promise.all(f.map(e => pictureProviderImplementation.delete(e))))
        await picturePrismaRepository.deleteAllPictures();
        await personPrismaRepository.deleteAllPersons();
        person1 = await personPrismaRepository.save(new Person({
            address: "Rua Dos Sabiás, Nº 142, São Paulo, Brasil",
            cpf: "646.139.870-83",
            gender: "Female", 
            name: "Belma Dolores Alves",
            nick: "Dolores",
            observations: "None",
            phone: "(12) 3717-9117"
        }));

        person2 = await personPrismaRepository.save(new Person({
            address: "",
            cpf: "518.800.600-60",
            gender: "Male", 
            name: "Micael Belchior Castilho",
            nick: "Micael",
            observations: "None",
            phone: "(15) 3422-6322"
        }))

        await picturePrismaRepository.save(new Picture({
            filename: "1643077746437_18240.jpg",
            originalname: "belma_dolores.jpg",
            person_id: person1.id
        }))
    })

    it("Should return an Uncompatible type error", async ()=>{
        const txtFilePath = resolve(fileTestPath, 'teste.txt'); 
        const response = await request(app).put(`/person/picture/${person1.id}`).attach(
            'picture', txtFilePath
        );
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Uncompatible Type"
        })
    })

    it("Should return a no such file uploaded", async ()=>{ 
        const response = await request(app).put(`/person/picture/${person1.id}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "No such file uploaded"
        })
    })

    it("Should return invalid id message", async()=>{
        const picturePath = resolve(fileTestPath, 'arquivo.jpg'); 
        const response = await request(app).put(`/person/picture/josé`).attach(
            'picture', picturePath
        );
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "ID is not a number"
        })
    })

    it("Should return a originalname is too big error", async ()=>{
        const bigFilePath = resolve(fileTestPath, 'Jlw6ZfceMgVWlSoPXhmdXH6FTPghPNmQemfQdMgmgPDxkdICP5Vo1bNBEj20Mg3rdHGZx6OIqP8TYfRWZtZVmk7ShHN9Inntib1qN.jpg'); 
        const response = await request(app).put(`/person/picture/${person1.id}`).attach(
            'picture', bigFilePath
        );
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Originalname is too big"
        })
    })

    it("Should return person doesn't exist error", async ()=>{
        const picturePath = resolve(fileTestPath, 'arquivo.jpg'); 
        const response = await request(app).put(`/person/picture/${person1.id+2}`).attach(
            'picture', picturePath
        );
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "This person doesn't exist"
        })
    })

    it("Should return this person doesn't have a picture message", async ()=>{
        const picturePath = resolve(fileTestPath, 'arquivo.jpg');
        const response = await request(app).put(`/person/picture/${person2.id}`).attach(
            'picture', picturePath
        ); 
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "This person doesn't have a picture"
        })
    })

    it("Should update a picture", async ()=>{
        const picturePath = resolve(fileTestPath, 'arquivo.jpg'); 
        const response = await request(app).put(`/person/picture/${person1.id}`).attach(
            'picture', picturePath
        );
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            person_id: person1.id,
            filename: expect.any(String), 
            originalname: "arquivo.jpg"
        })
    })
})