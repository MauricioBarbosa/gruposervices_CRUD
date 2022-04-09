import { unlink } from "fs/promises";
import { existsSync } from 'fs'
import { resolve } from "path";

import { IPictureProvider } from "../IPictureProvider";

const pictureDir = resolve(__dirname, '..', '..', '..', 'uploads', 'pictures'); 

export class PictureProviderImplementation implements IPictureProvider{

    async checkIfExists(file: string): Promise<boolean> {
        if(await existsSync(pictureDir + '/' + file)){
            return true; 
        }
        return false;     
    }

    async delete(file: string): Promise<boolean> {
        try {
            await unlink(pictureDir + '/' + file);
            return true; 
        } catch (error) {
            return false; 
        }
    }
}