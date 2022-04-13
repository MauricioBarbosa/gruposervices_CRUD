import { PictureProviderImplementation } from "../../../providers/deletepicture/PictureProviderImplementation";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { DeletePictureControl } from "./DeletePictureControl";
import { DeletePictureService } from "./DeletePictureService";

export const deletePictureFactory = () =>{
    const picturePrismaRepository = new PicturePrismaRepository();
    const pictureProviderImplementation = new PictureProviderImplementation(); 
    const storePictureService = new DeletePictureService(
        picturePrismaRepository, 
        pictureProviderImplementation
    );

    return new DeletePictureControl(storePictureService);
}