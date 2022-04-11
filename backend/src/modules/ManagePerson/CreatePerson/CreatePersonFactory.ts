import { PersonPrismaRepository } from "../../../repositories/implementation/prisma/PersonPrismaRepository"
import { CreatePersonControl } from "./CreatePersonControl";
import { CreatePersonService } from "./CreatePersonService";

export const createPersonFactory = () =>{
    const personsRepository = new PersonPrismaRepository();
    const createPersonService = new CreatePersonService(personsRepository);
    const createPersonControl = new CreatePersonControl(createPersonService);
    return createPersonControl; 
}