import { ISingleFileHandlerProvider } from '../ISingleFileHandlerProvider';
import multer from 'multer';

class SingleFileHandlerMulter implements ISingleFileHandlerProvider{
    start(config: any) {
        return multer(config).single('picture');
    }
}