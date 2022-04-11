import app from "../../../../app"; 
import request from "supertest"; 

describe("Testing CreatePersonControl", ()=>{

    it("Should return a name not informed error", async ()=>{
        const response = await request(app).post("/person").send({
            cpf: "476.613.876-70",
            nick: "José Alves Pereira", 
            gender: "Male", 
            phone: "(31) 99052-2886", 
            address: "Rua Cinco 855, Itabira, Minas Gerais",
            observations: ""
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Name not informed"
        })
    })

    // it("Should return a cpf not informed error", async ()=>{
    //     const response = await request(app).post("/person").send({
    //         name: "José Alves Pereira", 
    //         nick: "Zé", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "CPF not informed"
    //     })
    // })

    // it("Should return a nick not informed error", async ()=>{
    //     const response = await request(app).post("/person").send({
    //         name: "José Alves Pereira",
    //         cpf: "476.613.876-70",  
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Nick not informed"
    //     })
    // })

    // it("Should return a gender not informed error", async ()=>{
    //     const response = await request(app).post("/person").send({
    //         name: "José Alves Pereira",
    //         cpf: "476.613.876-70",  
    //         nick: "Zé", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Nick not informed"
    //     })
    // })

    // it("Should return a phone not informed error", async ()=>{
    //     const response = await request(app).post("/person").send({
    //         name: "José Alves Pereira",
    //         cpf: "476.613.876-70",  
    //         nick: "Zé",
    //         gender: "Male", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Phone not informed"
    //     })
    // })

    // it("Should return a address not informed error", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "José Alves Pereira",
    //         cpf: "476.613.876-70",
    //         nick: "José Alves Pereira", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Address not informed"
    //     })
    // })

    // it("Should return a observations not informed error", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "José Alves Pereira",
    //         cpf: "476.613.876-70",
    //         nick: "José Alves Pereira", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Address not informed"
    //     })
    // })

    // it("Should return an person name is too small error", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "Ze",
    //         cpf: "476.613.876-70",
    //         nick: "José Alves Pereira", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Person Name is too small"
    //     })
    // })

    // it("Should return an name length is too big error", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "G2cdHbRaOO59pwPKUAOcePax3pmmD86CA3UzIZMiBISpqS7djU9ZExeIq9Z1b0WGbX8XiN4dQlkHTo9Zn",
    //         cpf: "476.613.876-70",
    //         nick: "José Alves Pereira", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Person Name is too big"
    //     })
    // })

    // it("Should return a nick is too big error", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "Ze",
    //         cpf: "476.613.876-70",
    //         nick: "AGEjzIF8C5yHKOVedDBRcKl6AT6PJm8QvIRV1ZChiUzg6PjTZUtKIAfOLKshwzqvpiHIPBsMXhtUtwxLa", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Nick name is too big"
    //     })
    // })

    // it("Should return an address is too big error", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "Ze",
    //         cpf: "476.613.876-70",
    //         nick: "José Alves Pereira", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "4jLSt6uMeHQA4NFoRvjvTf4X2mVIZ3ggFTJ8i7iJH26KnHM9HJ8Y9Fdn7uQ1JfkpsVHx9WaRj03h6HbkA",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Address is too big"
    //     })
    // })

    // it("Should return a gender is too big error", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "Ze",
    //         cpf: "476.613.876-70",
    //         nick: "José Alves Pereira", 
    //         gender: "hgfCW9iNdFVi4FfKfzL5s", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Gender is too big"
    //     })
    // })

    // it("Should return an observation is too big error", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "Ze",
    //         cpf: "476.613.876-70",
    //         nick: "José Alves Pereira", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: "8BbnjCjCDqE3CFA73plXjLymTx0kKGns3NKzKRy9OsxWljt9ZTbSlnQaMSjyg1zd4stOivkpfn5zuGG0zB8UGQfOor4o0lhEW4YOt"
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Observation is too big"
    //     })
    // })

    // it("Should return a phone is too big error", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "Ze",
    //         cpf: "476.613.876-70",
    //         nick: "José Alves Pereira", 
    //         gender: "Male", 
    //         phone: "HvRqVqobB0K9qr2i", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Phone number is too big"
    //     })
    // })

    // it("Should return a invalid cpf error", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "Ze",
    //         cpf: "47661387670",
    //         nick: "José Alves Pereira", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toBe({
    //         message: "Invalid CPF"
    //     })
    // })

    // it("Should store a user", async ()=>{
    //     const response = await request(app).post("/person").send({   
    //         name: "Ze",
    //         cpf: "476.613.876-70",
    //         nick: "José Alves Pereira", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toBe({
    //         id: expect.any(Number),
    //         name: "Ze",
    //         cpf: "476.613.876-70",
    //         nick: "José Alves Pereira", 
    //         gender: "Male", 
    //         phone: "(31) 99052-2886", 
    //         address: "Rua Cinco 855, Itabira, Minas Gerais",
    //         observations: ""
    //     })
    // })

})