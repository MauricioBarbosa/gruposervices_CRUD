import appConfig from "../../../config/appConfig";
import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository";
import { ReadPersonControl } from "./ReadPersonControl";
import { ReadPersonService } from "./ReadPersonService";


export const readPersonFactory = () =>{
    const personRepository = new PersonPrismaRepository();
    const readPersonService = new ReadPersonService(personRepository, appConfig.pictureUrl);
    const readPersonControl = new ReadPersonControl(readPersonService);
    return readPersonControl; 
}