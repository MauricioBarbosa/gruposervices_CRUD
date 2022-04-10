import { Person } from "../../../entities/Person";
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { UpdatePersonService } from "./UpdatePersonService";

let personPrismaRepository: PersonPrismaRepository;
let picturePrismaRepository: PicturePrismaRepository;
let sut: UpdatePersonService;

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    picturePrismaRepository = new PicturePrismaRepository();
    sut = new UpdatePersonService(personPrismaRepository);
})

describe("Testing UpdatePersonService with prisma", ()=>{
    let person: Person; 
    
    beforeAll(async ()=>{
        await picturePrismaRepository.deleteAllPictures();
        await personPrismaRepository.deleteAllPersons();
        person = await personPrismaRepository.save(new Person({
            address: "",
            cpf: "646.139.870-83",
            gender: "Female", 
            name: "Belma Dolores Alves",
            nick: "Dolores",
            observations: "None",
            phone: "(12) 3717-9117"
        }));
    })

    it("Should throw a name length is too small error", async ()=>{
        await expect(sut.run({
            id: person.id,
            address: "",
            cpf: "646.139.870-83",
            gender: "Female", 
            name: "Be",
            nick: "Dolores",
            observations: "None",
            phone: "(12) 3717-9117"
        })).rejects.toEqual(
            new Error("name is too small")
        )
    })

    it("Should throw an name length is too big error", async ()=>{
        await expect(sut.run({
            id: person.id,
            address: "",
            cpf: "646.139.870-83",
            gender: "Female", 
            name: "G2cdHbRaOO59pwPKUAOcePax3pmmD86CA3UzIZMiBISpqS7djU9ZExeIq9Z1b0WGbX8XiN4dQlkHTo9Zn",
            nick: "Dolores",
            observations: "None",
            phone: "(12) 3717-9117"
        })).rejects.toEqual(
            new Error("name is too big")
        )
    })

    it("Should throw a nick is too big error", async ()=>{
        await expect(sut.run({
            id: person.id,
            name: "Belma Dolores Alves",
            address: "Rua José dos Anjos",
            cpf: "646.139.870-83", 
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
            id: person.id,
            name: "Belma Dolores Alves",
            address: "4jLSt6uMeHQA4NFoRvjvTf4X2mVIZ3ggFTJ8i7iJH26KnHM9HJ8Y9Fdn7uQ1JfkpsVHx9WaRj03h6HbkA",
            cpf: "646.139.870-83", 
            gender: "Female",
            nick: "",
            observations: "", 
            phone: ""
        })).rejects.toEqual(
            new Error("Address is too big")
        ); 
    })

    it("Should throw a gender is too big error", async ()=>{
        await expect(sut.run({
            id: person.id,
            name: "Belma Dolores Alves",
            address: "Rua José dos Anjos",
            cpf: "646.139.870-83",  
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
            id: person.id,
            name: "Belma Dolores Alves",
            address: "Rua José dos Anjos",
            cpf: "646.139.870-83", 
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
            id: person.id,
            name: "Belma Dolores Alves",
            address: "Rua José dos Anjos",
            cpf: "646.139.870-83",
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
            id: person.id,
            address: "Rua José dos Anjos",
            cpf: "64613987083",
            gender: "Female", 
            name: "Belma Dolores Alves Alterada",
            nick: "Dolores Alterada",
            observations: "Agora tem observações",
            phone: "(12) 3717-9117"
        })).rejects.toEqual(
            new Error("Invalid CPF")
        )
    })

    it("Should throw a invalid cpf error with letters", async ()=>{
        await expect(sut.run({
            id: person.id,
            address: "Rua José dos Anjos",
            cpf: "abc.def.ghi-ji", 
            gender: "Female", 
            name: "Belma Dolores Alves Alterada",
            nick: "Dolores Alterada",
            observations: "Agora tem observações",
            phone: "(12) 3717-9117"
        })).rejects.toEqual(
            new Error("Invalid CPF")
        ); 
    })

    it("Should throw a person doesn't exist error", async ()=>{
        await expect(sut.run({
            id: person.id + 1,
            address: "Rua José dos Anjos",
            cpf: "646.139.870-83",
            gender: "Female", 
            name: "Belma Dolores Alves Alterada",
            nick: "Dolores Alterada",
            observations: "Agora tem observações",
            phone: "(12) 3717-9117"
        })).rejects.toEqual(
            new Error("This person doesn't exist")
        )
    })

    it("should update a person", async ()=>{
        await expect(sut.run({
            id: person.id,
            address: "Rua José dos Anjos",
            cpf: "646.139.870-83",
            gender: "Female", 
            name: "Belma Dolores Alves Alterada",
            nick: "Dolores Alterada",
            observations: "Agora tem observações",
            phone: "(12) 3717-9117"
        })).resolves.toEqual(expect.objectContaining({
            id: person.id,
            createdAt: expect.any(Date), 
            updatedAt: expect.any(Date), 
            address: "Rua José dos Anjos",
            cpf: "646.139.870-83",
            gender: "Female", 
            name: "Belma Dolores Alves Alterada",
            nick: "Dolores Alterada",
            observations: "Agora tem observações",
            phone: "(12) 3717-9117"
        }))
    })
})