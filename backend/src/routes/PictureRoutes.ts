import { Router } from "express";
import { storePictureFactory } from "../modules/PersonPicture/StorePicture/StorePictureFactory";
import { updatePictureFactory } from './../modules/PersonPicture/UpdatePicture/UpdatePictureFactory';
import { deletePictureFactory } from "../modules/PersonPicture/DeletePicture/DeletePictureFactory";


const router = Router();

router.post("/:id", (request, response)=>{ 
    storePictureFactory().handle(request, response);
})

router.put("/:id", (request, response)=>{ 
    updatePictureFactory().handle(request, response);
})

router.delete("/:id", (request, response)=>{ 
    deletePictureFactory().handle(request, response);
})

export default router;