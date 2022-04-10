export class Picture{
    public readonly person_id: number; 
    public filename: string; 
    public originalname: string; 
    public url: string


    constructor(props: Partial<Picture>){
        Object.assign(this, props);
    }
}