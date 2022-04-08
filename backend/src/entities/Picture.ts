export class Picture{
    filename: string; 
    originalname: string; 

    constructor(props: Picture){
        Object.assign(this, props);
    }
}