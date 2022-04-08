import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { CreatePersonService } from "./CreatePersonService";

let personPrismaRepository: PersonPrismaRepository;
let sut: CreatePersonService;

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    sut = new CreatePersonService(personPrismaRepository);
})

describe("Testing CreatePersonService with prisma", ()=>{

    beforeEach(async ()=>{
        await personPrismaRepository.deleteAllPersons();
    })

    it("Should throw an name length is too small error", async ()=>{
        await expect(sut.run({
            name: "Jos",
            address: "L",
            cpf: "4", 
            gender: "Man",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("Person Name is too small")
        ); 
    })

    it("Should throw an name length is too big error", async ()=>{
        await expect(sut.run({
            name: "G2cdHbRaOO59pwPKUAOcePax3pmmD86CA3UzIZMiBISpqS7djU9ZExeIq9Z1b0WGbX8XiN4dQlkHTo9Zn",
            address: "L",
            cpf: "4", 
            gender: "Man",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("Person Name is too big")
        ); 
    })

    it("Should throw a cpf length is invalid error", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "123", 
            gender: "Man",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("invalid cpf length")
        ); 
    })

    it("Should throw a invalid cpf error", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "12345678910123", 
            gender: "Man",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("Invalid CPF")
        ); 
    })

    it("Shouldn't store a person with the same cpf", async ()=>{
        await sut.run({
            name: "José",
            address: "L",
            cpf: "123.456.789-10", 
            gender: "Man",
            nick: "",
            observations: "", 
            phone: ""
        });

        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "123.456.789-10", 
            gender: "Man",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("This person already exists")
        ); 
    })


    it("Should store a Person", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "123.456.789-10", 
            gender: "Man",
            nick: "",
            observations: "", 
            phone: ""
        })).resolves.toEqual(expect.objectContaining({
            id: expect.any(Number), 
            address: "L",
            cpf: "123.456.789-10", 
            gender: "Man",
            nick: "",
            observations: "", 
            phone: ""
        }))
    })
})