import { Person } from './../../../entities/Person';
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { DeletePersonService } from "./DeletePersonService";

let personPrismaRepository: PersonPrismaRepository;
let sut: DeletePersonService;

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    sut = new DeletePersonService(personPrismaRepository);
})

describe("Testing DeletePersonService with Prisma", ()=>{

    let person: Person;

    beforeAll(async ()=>{
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
    })

    it("Should throw a Person doesn't exist error", async ()=>{
        await expect(sut.run(person.id + 1)).rejects.toEqual(
            new Error("This person don't exist")
        )
    })

    it("Should delete a user", async ()=>{
        await sut.run(person.id); 

        await expect(sut.run(person.id)).rejects.toEqual(
            new Error("This person don't exist")
        );
    })
})