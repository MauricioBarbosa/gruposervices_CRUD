import { Person } from './../../../entities/Person';
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { StorePictureService } from "./StorePictureService";

let picturePrismaRepository: PicturePrismaRepository;
let personPrismaRepository: PersonPrismaRepository;
let sut: StorePictureService;

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
    sut = new StorePictureService(picturePrismaRepository, personPrismaRepository);
})

describe("Testing StorePictureService with prisma", ()=>{

    let person: Person;

    beforeAll(async ()=>{
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
    })

    it("Should throw a filename is too small error", async ()=>{
        await expect(sut.run({
            person_id: person.id,
            filename: "164", 
            originalname: "Belma.jpeg"
        })).rejects.toEqual(
            new Error("Filename is too small")
        )
    })

    it("Should throw a filename is too big error", async ()=>{
        await expect(sut.run({
            person_id: person.id,
            filename: "Jlw6ZfceMgVWlSoPXhmdXH6FTPghPNmQemfQdMgmgPDxkdICP5Vo1bNBEj20Mg3rdHGZx6OIqP8TYfRWZtZVmk7ShHN9Inntib1qN", 
            originalname: "Belma.jpeg"
        })).rejects.toEqual(
            new Error("Filename is too big")
        )
    })

    it("Should throw person doesn't exist error", async ()=>{
        await expect(sut.run({
            person_id: person.id + 1,
            filename: "1643077746437_18240", 
            originalname: "Belma.jpeg"
        })).rejects.toEqual(
            new Error("This person doesn't exist")
        )
    })

    it("Should store a picture", async ()=>{
        await expect(sut.run({
            person_id: person.id,
            filename: "1643077746437_18240", 
            originalname: "Belma.jpeg"
        })).resolves.toEqual(expect.objectContaining({
            person_id: person.id,
            filename: "1643077746437_18240", 
            originalname: "Belma.jpeg"
        }))
    })
})