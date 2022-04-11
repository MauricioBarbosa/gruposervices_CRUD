import app from '../../app';
import request from 'supertest';

describe("Testing CreatePersonControl", ()=>{
    it("Should create a new user", ()=>{
        request(app).post('/')
    })
})