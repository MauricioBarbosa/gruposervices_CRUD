import { Person } from './../../../entities/Person';
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { ReadPersonService } from "./ReadPersonService";

let personPrismaRepository: PersonPrismaRepository;
let sut: ReadPersonService;

beforeAll(async () =>{
    personPrismaRepository = new PersonPrismaRepository();
    sut = new ReadPersonService(personPrismaRepository);
})

describe("Testing ReadPersonService method runById with prisma", ()=>{

    let person: Person; 

    beforeAll(async ()=>{

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
    })

    it("Should throw an person not found error", async ()=>{
        await expect(sut.runById(person.id+1)).rejects.toEqual(
            new Error("Person not found")
        )
    })

    it("Should return an person", async ()=>{
        await expect(sut.runById(person.id)).resolves.toEqual(expect.objectContaining({
            id: person.id,
            ...person
        }))  
    })
})

describe("Testing ReadPersonService method runByName with prisma", ()=>{

    let persons: Array<Person>; 

    beforeAll(async ()=>{
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
                    phone: "+55 9555328494"
                })
            ])
        )
    })
})