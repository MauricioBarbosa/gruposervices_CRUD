import { PicturePrismaRepository } from './../../../repositories/implementation/prisma/PicturePrismaRepository';
import { PictureProviderImplementation } from './../../../providers/deletepicture/PictureProviderImplementation';
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository"
import { DeletePersonControl } from "./DeletePersonControl";
import { DeletePersonService } from "./DeletePersonService";

export const deletePersonFactory = () =>{
    const personRepository = new PersonPrismaRepository();
    const pictureProviderImplementation = new PictureProviderImplementation();
    const pictureRepository = new PicturePrismaRepository();
    const deletePersonService = new DeletePersonService(
        personRepository, 
        pictureProviderImplementation,
        pictureRepository
    );
    const deletePersonControl = new DeletePersonControl(deletePersonService);
    return deletePersonControl; 
}