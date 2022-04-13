import app from "../../../../app"; 
import request from "supertest"; 
import { resolve } from "path";
import fs from 'fs/promises'

import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { PictureProviderImplementation } from "../../../providers/deletepicture/PictureProviderImplementation";

import { Person } from "../../../entities/Person";
import { Picture } from "../../../entities/Picture";


const uploadPicFolder = resolve(__dirname, '..', '..', '..', '..', 'uploads', 'pictures');
const fileTestPath = resolve(__dirname, '..', '..', '..', '..', 'img-test'); 

let picturePrismaRepository: PicturePrismaRepository;
let personPrismaRepository: PersonPrismaRepository;
let pictureProviderImplementation: PictureProviderImplementation;

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
    pictureProviderImplementation = new PictureProviderImplementation();
})

describe("testing StorePictureControl with multer", ()=>{
    let person: Person;
    let personWithPicture: Person;

    beforeAll(async ()=>{
        await fs.readdir(uploadPicFolder).then((f) => Promise.all(f.map(e => pictureProviderImplementation.delete(e))))
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

        personWithPicture = await personPrismaRepository.save(new Person({
            address: "",
            cpf: "663.473.726-65",
            gender: "Female", 
            name: "Benedita da Silva",
            nick: "Benedita",
            observations: "None",
            phone: "+55 9555328494"
        })); 

        await picturePrismaRepository.save(new Picture({
            filename: "182918391_1231431.jpg", 
            originalname: "benedita.jpg",
            person_id: personWithPicture.id
        }))
    })

    it("Should throw an Uncompatible type error", async ()=>{
        const txtFilePath = resolve(__dirname, '..', '..', '..', '..', 'img-test', 'teste.txt'); 
        const response = await request(app).post(`/person/picture/${person.id}`).attach(
            'picture', txtFilePath
        );
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Uncompatible Type"
        })
    })

    it("Should throw a no such file uploaded", async ()=>{ 
        const response = await request(app).post(`/person/picture/${person.id}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "No such file uploaded"
        })
    })

    it("Should return invalid id message", async()=>{
        const picturePath = resolve(fileTestPath, 'arquivo.jpg'); 
        const response = await request(app).post(`/person/picture/josé`).attach(
            'picture', picturePath
        );
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "ID is not a number"
        })
    })

    it("Should throw a originalname is too big error", async ()=>{
        const bigFilePath = resolve(fileTestPath, 'Jlw6ZfceMgVWlSoPXhmdXH6FTPghPNmQemfQdMgmgPDxkdICP5Vo1bNBEj20Mg3rdHGZx6OIqP8TYfRWZtZVmk7ShHN9Inntib1qN.jpg'); 
        const response = await request(app).post(`/person/picture/${person.id}`).attach(
            'picture', bigFilePath
        );
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Originalname is too big"
        })
    })

    it("Should throw person doesn't exist error", async ()=>{
        const picturePath = resolve(fileTestPath, 'arquivo.jpg'); 
        const response = await request(app).post(`/person/picture/${person.id+2}`).attach(
            'picture', picturePath
        );
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "This person doesn't exist"
        })
    })

    it("Should return a Person already has a picture try to update instead error", async ()=>{
        const picturePath = resolve(fileTestPath, 'arquivo.jpg'); 
        const response = await request(app).post(`/person/picture/${personWithPicture.id}`).attach(
            'picture', picturePath
        );
        
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "This person has already a picture, try to update instead"
        })
    })

    it("Should store a person", async ()=>{
        const picturePath = resolve(fileTestPath, 'arquivo.jpg'); 
        const response = await request(app).post(`/person/picture/${person.id}`).attach(
            'picture', picturePath
        );
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            person_id: person.id,
            filename: expect.any(String), 
            originalname: "arquivo.jpg"
        })
    })
})