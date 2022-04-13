import express from 'express';
import { resolve } from 'path';

import personRoutes from './src/routes/PersonRoutes'; 
import personPictureRoutes from './src/routes/PictureRoutes';

class App{
    public app: express.Application; 

    constructor(app: express.Application){
        this.app = app; 
        this.middlewares(); 
        this.routes();
    }

    private routes(){
        this.app.use(
            '/person/' , personRoutes
        )
        this.app.use(
            '/person/picture/', personPictureRoutes
        )
    }

    private middlewares(){
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json());
        this.app.use(express.static(resolve(__dirname, 'uploads', 'pictures'))); 
    }
}



export default new App(express()).app;