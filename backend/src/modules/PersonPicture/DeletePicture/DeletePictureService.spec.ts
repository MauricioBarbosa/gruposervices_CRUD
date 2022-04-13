import { PictureProviderImplementation } from "../../../providers/deletepicture/PictureProviderImplementation";
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { DeletePictureService } from "./DeletePictureService";

import { Person } from "../../../entities/Person";
import { Picture } from "../../../entities/Picture";

let picturePrismaRepository: PicturePrismaRepository;
let personPrismaRepository: PersonPrismaRepository;
let pictureProviderImplementation: PictureProviderImplementation
let sut: DeletePictureService;

/**
 * Must put a file manually in this test
 */

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
    pictureProviderImplementation = new PictureProviderImplementation();
    sut = new DeletePictureService(
        picturePrismaRepository,
        pictureProviderImplementation
    );
})

describe("Testing DeletePersonPicture service method RunById", ()=>{

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
            filename: "1643077746437_18240.jpg",
            originalname: "belma_dolores.jpg",
            person_id: person.id
        }))
    })

    it("Should throw a picture not exists error", async ()=>{
        await expect(sut.runById(person.id+1)).rejects.toEqual(
            new Error("this picture doesn't exist")
        )
    })

    it("Should remove a picture", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'checkIfExists');
        const deleted_picture = await sut.runById(person.id); 

        expect(deletePictureSpy).toHaveBeenCalledTimes(1);

        expect(deleted_picture).toEqual(new Picture({
            filename: "1643077746437_18240.jpg",
            originalname: "belma_dolores.jpg",
            person_id: person.id
        }))
    })
})

describe("Testing DeletePersonPicture service method RunByFilename", ()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
    })

    it("should throw a file is not stored error", async ()=>{
        await expect(sut.runByFileName("josé.png")).rejects.toEqual(
            new Error("This file is not stored")
        )
    })

    it("should delete a file", async ()=>{
        const deletePictureSpy = jest.spyOn(pictureProviderImplementation, 'checkIfExists');
        const deletedPicture = await sut.runByFileName("1643077831430_17809.jpg"); 

        expect(deletePictureSpy).toHaveBeenCalledTimes(1);
        expect(deletedPicture).toBe(true);
    })
})