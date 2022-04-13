import { Person } from './../../../entities/Person';
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { StorePictureService } from "./StorePictureService";
import { PictureProviderImplementation } from './../../../providers/deletepicture/PictureProviderImplementation';
import { Picture } from '../../../entities/Picture';

let picturePrismaRepository: PicturePrismaRepository;
let personPrismaRepository: PersonPrismaRepository;
let pictureProviderImplementation: PictureProviderImplementation;
let sut: StorePictureService;

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
    pictureProviderImplementation = new PictureProviderImplementation();
    sut = new StorePictureService(picturePrismaRepository, personPrismaRepository, pictureProviderImplementation);
})

describe("Testing StorePictureService run method with prisma", ()=>{

    let person: Person;
    let personWithPicture: Person; 

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

    afterEach(()=>{
        jest.clearAllMocks();
    })

    it("Should throw a filename is too small error", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await expect(sut.run({
            person_id: person.id,
            filename: "164", 
            originalname: "Belma.jpeg"
        })).rejects.toEqual(
            new Error("Filename is too small")
        )
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })

    it("Should throw a filename is too big error", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await expect(sut.run({
            person_id: person.id,
            filename: "Jlw6ZfceMgVWlSoPXhmdXH6FTPghPNmQemfQdMgmgPDxkdICP5Vo1bNBEj20Mg3rdHGZx6OIqP8TYfRWZtZVmk7ShHN9Inntib1qN", 
            originalname: "Belma.jpeg"
        })).rejects.toEqual(
            new Error("Filename is too big")
        );
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })

    it("Should throw a originalname is too big error", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await expect(sut.run({
            person_id: person.id,
            filename: "1643077746437_18240", 
            originalname: "Jlw6ZfceMgVWlSoPXhmdXH6FTPghPNmQemfQdMgmgPDxkdICP5Vo1bNBEj20Mg3rdHGZx6OIqP8TYfRWZtZVmk7ShHN9Inntib1qN"
        })).rejects.toEqual(
            new Error("Originalname is too big")
        );
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })

    it("Should throw person doesn't exist error", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await expect(sut.run({
            person_id: person.id + 2,
            filename: "1643077746437_18240", 
            originalname: "Belma.jpeg"
        })).rejects.toEqual(
            new Error("This person doesn't exist")
        )
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })

    it("Should throw a Person already has a picture try to update instead error", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await expect(sut.run({
            person_id: personWithPicture.id,
            filename: "1643077746437_18240", 
            originalname: "Belma.jpeg"
        })).rejects.toEqual(
            new Error("This person has already a picture, try to update instead")
        )
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
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

describe("Testing StorePictureService deletePicture", ()=>{
    it("Should run method delete at least one time", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await sut.deletePicture('1649890313572_13997.jpg');
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })
})

//checar se a pessoa já não tem uma picture