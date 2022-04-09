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
            gender: "Male",
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
            gender: "Male",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("Person Name is too big")
        ); 
    })

    it("Should throw a nick is too big error", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "4", 
            gender: "Male",
            nick: "AGEjzIF8C5yHKOVedDBRcKl6AT6PJm8QvIRV1ZChiUzg6PjTZUtKIAfOLKshwzqvpiHIPBsMXhtUtwxLa",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("Nick name is too big")
        ); 
    })

    it("Should throw an address is too big error", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "4jLSt6uMeHQA4NFoRvjvTf4X2mVIZ3ggFTJ8i7iJH26KnHM9HJ8Y9Fdn7uQ1JfkpsVHx9WaRj03h6HbkA",
            cpf: "4", 
            gender: "Male",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("Address is too big")
        ); 
    })

    it("Should throw a gender is too big error", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "4", 
            gender: "hgfCW9iNdFVi4FfKfzL5s",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("Gender is too big")
        ); 
    })

    it("Should throw an observation is too big error", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "4", 
            gender: "Male",
            nick: "",
            observations: "8BbnjCjCDqE3CFA73plXjLymTx0kKGns3NKzKRy9OsxWljt9ZTbSlnQaMSjyg1zd4stOivkpfn5zuGG0zB8UGQfOor4o0lhEW4YOt", 
            phone: ""
        })).rejects.toEqual(
            new Error("Observation is too big")
        ); 
    })

    it("Should throw a phone is too big error", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "4", 
            gender: "Male",
            nick: "",
            observations: "", 
            phone: "HvRqVqobB0K9qr2i"
        })).rejects.toEqual(
            new Error("Phone number is too big")
        ); 
    })

    it("Should throw a invalid cpf error", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "12345678910123", 
            gender: "Male",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("Invalid CPF")
        ); 
    })

    it("Should throw a invalid cpf error with letters", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "abc.def.ghi-ji", 
            gender: "Male",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("Invalid CPF")
        ); 
    })

    it("Should store a Person", async ()=>{
        await expect(sut.run({
            name: "José",
            address: "L",
            cpf: "123.456.789-10", 
            gender: "Male",
            nick: "",
            observations: "", 
            phone: ""
        })).resolves.toEqual(expect.objectContaining({
            id: expect.any(Number), 
            address: "L",
            cpf: "123.456.789-10", 
            gender: "Male",
            nick: "",
            observations: "", 
            phone: ""
        }))
    })
})