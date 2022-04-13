import { Router } from "express";
import { storePictureFactory } from "../modules/PersonPicture/StorePicture/StorePictureFactory";

const router = Router();

router.post("/:id", (request, response)=>{ 
    storePictureFactory().handle(request, response);
})

export default router;