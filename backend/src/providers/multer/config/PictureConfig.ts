import multer, { Options } from "multer";
import { extname, resolve } from "path";

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000)

const filterConfig = (req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, operation: boolean) => void) => {
    if(file.mimetype != 'image/jpeg'){
        return callback(new Error('Uncompatible Type'), false);
    }
    return callback(null, true);
};

const storageConfig = multer.diskStorage({
    destination: (
        req: Express.Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void) => {
            callback(null, resolve(__dirname, '..', '..', '..', '..', 'uploads', 'pictures'))
    },
    filename: (
        req: Express.Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void) => {
            callback(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
})

const SinglePictureConfig = {
    storage: storageConfig,
    fileFilter: filterConfig,
    limits: { fieldSize: 10 * 1024 * 1024 }
} as Options;

export default SinglePictureConfig; 