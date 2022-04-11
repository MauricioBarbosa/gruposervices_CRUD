import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository"
import { UpdatePersonControl } from "./UpdatePersonControl";
import { UpdatePersonService } from "./UpdatePersonService";

export const updatePersonFactory = () =>{
    const personRepository = new PersonPrismaRepository();
    const updatePersonService = new UpdatePersonService(personRepository);
    const updatePersonControl = new UpdatePersonControl(updatePersonService);
    return updatePersonControl; 
}