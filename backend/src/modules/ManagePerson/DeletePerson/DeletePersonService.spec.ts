import { Person } from './../../../entities/Person';
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from '../../../repositories/implementation/prisma/PicturePrismaRepository';
import { PictureProviderImplementation } from '../../../providers/deletepicture/PictureProviderImplementation';

import { DeletePersonService } from "./DeletePersonService";
import { Picture } from '../../../entities/Picture';


let personPrismaRepository: PersonPrismaRepository;
let picturePrismaRepository: PicturePrismaRepository;
let pictureProviderImplementation: PictureProviderImplementation
let sut: DeletePersonService;

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
    pictureProviderImplementation = new PictureProviderImplementation();
    sut = new DeletePersonService(
        personPrismaRepository, 
        pictureProviderImplementation,
        picturePrismaRepository
    );
})

describe("Testing DeletePersonService with Prisma", ()=>{

    let person: Person;
    let personWithPicture: Person;
    let pictureOfTherPersonWithPicture: Picture 

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

        personWithPicture = await personPrismaRepository.save(new Person({
            ...personWithPictureData
        }))

        pictureOfTherPersonWithPicture = await picturePrismaRepository.save(new Picture({
            person_id: personWithPicture.id,
            filename: "1643077746437_18240.jpg",
            originalname: "foto.jpg",
        }));
    })

    it("Should throw a Person doesn't exist error", async ()=>{
        await expect(sut.run(person.id + 2)).rejects.toEqual(
            new Error("This person don't exist")
        )
    })

    it("Should delete a user", async ()=>{
        await sut.run(person.id); 

        await expect(sut.run(person.id)).rejects.toEqual(
            new Error("This person don't exist")
        );
    })

    it("Should delete a user with his pic", async () => {
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'checkIfExists');
        await sut.run(personWithPicture.id); 
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })
})