import { Router } from "express";

import { createPersonFactory } from "../modules/ManagePerson/CreatePerson/CreatePersonFactory";

const router = Router();

router.post("/", (request, response)=>{
    createPersonFactory().handle(request, response);
})

export default router;