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

    it("Should return invalid ID error", async ()=>{
        const response = await request(app).get(`/person/?id=teste`)

        expect(response.status).toBe(400); 
        expect(response.body).toEqual({
            message: "Invalid ID"
        })
    })

    it("Should return a person not found error", async ()=>{
        const response = await request(app).get(`/person/?id=${person.id + 1}`)

        expect(response.status).toBe(400); 
        expect(response.body).toEqual({
            message: "Person not found"
        })
    })

    it("Should return a person", async ()=>{
        const response = await request(app).get(`/person/?id=${person.id}`)

        expect(response.status).toBe(200); 
        expect(response.body).toEqual(expect.objectContaining({
                id: person.id,
                address: "",
                cpf: "518.800.600-60",
                gender: "Male",
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: "Micael Belchior Castilho",
                nick: "Micael",
                observations: "None",
                phone: "(15) 3422-6322", 
                picture: {
                    url: appConfig.pictureUrl + picture.filename,
                    filename: '1643077746437_18223.jpg',
                    originalname: 'file.jpg',
                    person_id: person.id
                }          
            }));
    })
})

describe("Testing ReadPersonControl by name", ()=>{
    let persons: Array<Person>; 
    let beneditaPicture: Picture; 

    beforeAll(async ()=>{
        await picturePrismaRepository.deleteAllPictures();
        await personPrismaRepository.deleteAllPersons();

        persons = [
            new Person({
                address: "",
                cpf: "663.473.726-65",
                gender: "Female", 
                name: "Benedita da Silva",
                nick: "Benedita",
                observations: "None",
                phone: "+55 9555328494"
            }),
            new Person({
                address: "",
                cpf: "646.139.870-83",
                gender: "Female", 
                name: "Belma Dolores Alves",
                nick: "Dolores",
                observations: "None",
                phone: "(12) 3717-9117"
            }),
            new Person({
                address: "",
                cpf: "051.157.570-01",
                gender: "Male", 
                name: "Mauro Vilas Boas Sodré",
                nick: "Mauro",
                observations: "None",
                phone: "(16) 3744-5032"
            }),
            new Person({
                address: "",
                cpf: "825.878.050-66",
                gender: "Female", 
                name: "Marie Castagne Felix",
                nick: "Felix",
                observations: "None",
                phone: "(12)3456-6547"
            })
        ]

        await personPrismaRepository.createMany(persons);

        const beneditaPerson = await (await personPrismaRepository.findByName("Benedita da Silva")).at(0); 

        beneditaPicture = await picturePrismaRepository.save(new Picture({
            filename: "1643077746437_18223.jpg",
            originalname: "file.jpg",
            person_id: beneditaPerson.id
        }))
    })

    it("Should return all registered persons", async ()=>{
        const response = await request(app).get("/person/");
        expect(response.status).toBe(200); 

        console.log(response.body);

        expect(response.body).toHaveLength(persons.length);
    })

    it("Should return length equal 2: Persons whose name starts with B", async ()=>{
        const response = await request(app).get("/person/?src=B"); 

        expect(response.status).toBe(200); 
        expect(response.body).toHaveLength(2);
    })

    it("Should return persons whose name starts with B", async ()=>{
        const response = await request(app).get("/person/?src=B");

        expect(response.status).toBe(200); 
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    createdAt: expect.any(String), 
                    updatedAt: expect.any(String),
                    address: "",
                    cpf: "646.139.870-83",
                    gender: "Female", 
                    name: "Belma Dolores Alves",
                    nick: "Dolores",
                    observations: "None",
                    phone: "(12) 3717-9117"
                }),
                expect.objectContaining({
                    id: expect.any(Number),
                    createdAt: expect.any(String), 
                    updatedAt: expect.any(String), 
                    address: "",
                    cpf: "663.473.726-65",
                    gender: "Female", 
                    name: "Benedita da Silva",
                    nick: "Benedita",
                    observations: "None",
                    phone: "+55 9555328494", 
                    picture: {
                        filename: "1643077746437_18223.jpg",
                        originalname: "file.jpg",
                        person_id: expect.any(Number),
                        url: appConfig.pictureUrl + beneditaPicture.filename
                    }
                })
            ])
        )
    })
})

