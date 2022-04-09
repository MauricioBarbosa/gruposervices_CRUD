import { Person } from './../entities/Person';
import { Picture } from "../entities/Picture";

export interface IPictureRepository{
    save(picture: Picture): Promise<Picture>
    deleteAllPictures():Promise<void>
    deletePicture(person_id: number): Promise<Picture>
    findById(person_id: number): Promise<Picture | null>
}