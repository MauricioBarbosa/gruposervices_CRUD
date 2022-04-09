export class Picture{
    public readonly person_id: number; 
    filename: string; 
    originalname: string; 

    constructor(props: Picture){
        Object.assign(this, props);
    }
}