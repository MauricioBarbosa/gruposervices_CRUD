export default interface ReadPersonData{
    id: string
    name: string; 
    cpf: string; 
    nick: string; 
    gender: string; 
    phone: string; 
    address: string;
    observations: string;
    createdAt: string, 
    updatedAt: string, 
    picture: {
        filename: string,
        originalname: string,
        person_id: number,
        url: string
    }
}