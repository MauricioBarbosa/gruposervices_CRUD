import { ISingleFileHandlerProvider } from '../ISingleFileHandlerProvider';
import multer from 'multer';

export class SingleFileHandlerMulter implements ISingleFileHandlerProvider{
    start(config: any) {
        return multer(config).single('picture');
    }
}