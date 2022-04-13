import { Person } from './../../../entities/Person';
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { UpdatePictureService } from "./UpdatePictureService";
import { PictureProviderImplementation } from '../../../providers/deletepicture/PictureProviderImplementation';
import { Picture } from '../../../entities/Picture';

let picturePrismaRepository: PicturePrismaRepository;
let personPrismaRepository: PersonPrismaRepository;
let pictureProviderImplementation: PictureProviderImplementation
let sut: UpdatePictureService;

/**
 * Must put a file manually in this test
 */

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
    pictureProviderImplementation = new PictureProviderImplementation();
    sut = new UpdatePictureService(
        picturePrismaRepository, 
        personPrismaRepository, 
        pictureProviderImplementation
    );
})

describe("Testing UpdatePictureService method run with prisma", ()=>{

    let person1: Person;
    let person2: Person; 

    beforeAll(async ()=>{
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

    afterEach(()=>{
        jest.clearAllMocks();
    })

    it("Should throw a filename is too small error", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await expect(sut.run({
            person_id: person1.id,
            filename: "164", 
            originalname: "belma_dolores.jpg"
        })).rejects.toEqual(
            new Error("Filename is too small")
        )
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })

    it("Should throw a filename is too big error", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await expect(sut.run({
            person_id: person1.id,
            filename: "Jlw6ZfceMgVWlSoPXhmdXH6FTPghPNmQemfQdMgmgPDxkdICP5Vo1bNBEj20Mg3rdHGZx6OIqP8TYfRWZtZVmk7ShHN9Inntib1qN", 
            originalname: "belma_dolores.jpg"
        })).rejects.toEqual(
            new Error("Filename is too big")
        )
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })

    it("Should throw a originalname is too big error", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await expect(sut.run({
            person_id: person1.id,
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
            person_id: person2.id + 1,
            filename: "1643077831430_17809.jpg", 
            originalname: "belma_dolores.jpg"
        })).rejects.toEqual(
            new Error("This person doesn't exist")
        )
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })

    it("Should throw person doesn't have a picture error", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await expect(sut.run({
            person_id: person2.id,
            filename: "1643077831430_17809.jpg", 
            originalname: "belma_dolores.jpg"
        })).rejects.toEqual(
            new Error("This person doesn't have a picture")
        )
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })

    it("Should Update a picture", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await expect(sut.run({
            person_id: person1.id,
            filename: "1643077746437_18223.jpg", 
            originalname: "Belma.jpeg"
        })).resolves.toEqual(expect.objectContaining({
            person_id: person1.id,
            filename: "1643077746437_18223.jpg", 
            originalname: "Belma.jpeg"
        }))
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })
})

describe("Testing UpdatePictureService deletePicture method", ()=>{
    it("Should run method delete at least one time", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'delete');
        await sut.deletePicture('1649890852896_18880.jpg');
        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
    })
})