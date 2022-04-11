import { readPersonFactory } from './../modules/ManagePerson/ReadPerson/ReadPersonFactory';
import { Router } from "express";

import { createPersonFactory } from "../modules/ManagePerson/CreatePerson/CreatePersonFactory";
import { updatePersonFactory } from './../modules/ManagePerson/UpdatePerson/UpdatePersonFactory';

const router = Router();

router.post("/", (request, response)=>{
    createPersonFactory().handle(request, response);
})

router.put("/:id", (request, response)=>{
    updatePersonFactory().handle(request, response);
})

router.get("/", (request, response)=>{
    readPersonFactory().handle(request, response);
})

export default router;