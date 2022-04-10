import appConfig from "../../../config/appConfig";
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from '../../../repositories/implementation/prisma/PicturePrismaRepository';

import { ReadPersonService } from "./ReadPersonService";

import { Person } from './../../../entities/Person';
import { Picture } from "../../../entities/Picture";

let personPrismaRepository: PersonPrismaRepository;
let picturePrismaRepository: PicturePrismaRepository; 
let sut: ReadPersonService;

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
    sut = new ReadPersonService(personPrismaRepository, appConfig.pictureUrl);
})

describe("Testing ReadPersonService method runById with prisma", ()=>{

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

    it("Should throw an person not found error", async ()=>{
        await expect(sut.runById(person.id+1)).rejects.toEqual(
            new Error("Person not found")
        )
    })

    it("Should return an person", async ()=>{
        await expect(sut.runById(person.id)).resolves.toEqual(expect.objectContaining({
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
        }))  
    })
})

describe("Testing ReadPersonService method runByName with prisma", ()=>{

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
        await expect(sut.run()).resolves.toHaveLength(
            persons.length
        ); 
    })

    it("Should have length equal 2: Persons whose name starts with B", async ()=>{
        await expect(sut.run("B")).resolves.toHaveLength(
            2
        ); 
    })

    it("Should return persons whose name starts with B", async ()=>{
        await expect(sut.run("B")).resolves.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    createdAt: expect.any(Date), 
                    updatedAt: expect.any(Date),
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
                    createdAt: expect.any(Date), 
                    updatedAt: expect.any(Date), 
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
                        url: appConfig.pictureUrl + '/' + beneditaPicture.filename
                    }
                })
            ])
        )
    })
})