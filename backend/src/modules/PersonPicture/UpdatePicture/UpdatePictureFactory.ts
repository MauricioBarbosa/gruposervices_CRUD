import { UpdatePictureControl } from './UpdatePictureControl';
import { UpdatePictureService } from './UpdatePictureService';
import { PictureProviderImplementation } from "../../../providers/deletepicture/PictureProviderImplementation";
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { PicturePrismaRepository } from "../../../repositories/implementation/prisma/PicturePrismaRepository";
import { SingleFileHandlerMulter } from '../../../providers/multer/FileHandlerMulter';
import SinglePictureConfig from '../../../providers/multer/config/PictureConfig';

export const updatePictureFactory = () =>{
    const personPrismaRepository = new PersonPrismaRepository();
    const picturePrismaRepository = new PicturePrismaRepository();
    const pictureProviderImplementation = new PictureProviderImplementation(); 
    const updatePictureService = new UpdatePictureService(
        picturePrismaRepository, 
        personPrismaRepository,
        pictureProviderImplementation,
    )

    return new UpdatePictureControl(updatePictureService, new SingleFileHandlerMulter().start(SinglePictureConfig));
}
