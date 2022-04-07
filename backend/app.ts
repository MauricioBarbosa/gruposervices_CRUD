import express from 'express';

class App{
    public app: express.Application; 

    constructor(app: express.Application){
        this.app = app; 
        this.routes(); 
    }

    private routes(){
        this.app.use(
            '/', (req, res) => {
                return res.status(200).json("App funcionando...")
            }
        )
    }
}



export default new App(express()).app;