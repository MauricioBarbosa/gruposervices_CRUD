import { Router } from "express";
import { storePictureFactory } from "../modules/PersonPicture/StorePicture/StorePictureFactory";
import { updatePictureFactory } from './../modules/PersonPicture/UpdatePicture/UpdatePictureFactory';


const router = Router();

router.post("/:id", (request, response)=>{ 
    storePictureFactory().handle(request, response);
})

router.put("/:id", (request, response)=>{ 
    updatePictureFactory().handle(request, response);
})

export default router;