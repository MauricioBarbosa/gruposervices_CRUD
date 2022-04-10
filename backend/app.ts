import express from 'express';
import { resolve } from 'path';

class App{
    public app: express.Application; 

    constructor(app: express.Application){
        this.app = app; 
        this.routes();
        this.middlewares(); 
    }

    private routes(){
    
    }

    private middlewares(){
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json());
        this.app.use(express.static(resolve(__dirname, 'uploads', 'pictures'))); 
    }
}



export default new App(express()).app;