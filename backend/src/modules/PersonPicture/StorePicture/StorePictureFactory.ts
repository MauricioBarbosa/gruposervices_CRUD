import { StorePictureControl } from './StorePictureControl';
import { StorePictureService } from './StorePictureService';
import { PictureProviderImplementation } from "../../../providers/deletepicture/PictureProviderImplementation";
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { SingleFileHandlerMulter } from '../../../providers/multer/FileHandlerMulter';
import SinglePictureConfig from '../../../providers/multer/config/PictureConfig';

export const storePictureFactory = () =>{
    const personPrismaRepository = new PersonPrismaRepository();
    const picturePrismaRepository = new PicturePrismaRepository();
    const pictureProviderImplementation = new PictureProviderImplementation(); 
    const storePictureService = new StorePictureService(
        picturePrismaRepository, 
        personPrismaRepository,
        pictureProviderImplementation,
    )

    return new StorePictureControl(storePictureService, new SingleFileHandlerMulter().start(SinglePictureConfig));
}
