import { Person } from './../../../entities/Person';
import { prisma } from '../../../database/prisma/client';
import { Picture } from '../../../entities/Picture';
import { IPictureRepository } from './../../IPictureRepository';

export class PicturePrismaRepository implements IPictureRepository{

    async save(picture: Picture):Promise<Picture> {
        const savedPicture = await prisma.picture.create({
            data: {
                ...picture, 
            }
        })

        return new Picture({
            ...savedPicture
        })
    }

    async findById(person_id: number): Promise<Picture | null>{
        const foundPicture = await prisma.picture.findFirst({
            where: {
                person_id: person_id
            }
        }); 

        if(foundPicture){
            return new Picture({
                ...foundPicture
            })
        }
        return null;
    }

    async deleteAllPictures(): Promise<void> {
        await prisma.picture.deleteMany({});
    }

    async deletePicture(person_id: number): Promise<Picture> {
        const deletedPicture = await prisma.picture.delete({
            where: {
                person_id: person_id
            }
        })

        return new Picture({
            ...deletedPicture
        });
    }
}