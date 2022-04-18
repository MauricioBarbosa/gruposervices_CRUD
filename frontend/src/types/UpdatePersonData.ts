export interface UpdatePersonData{
    id: number;
    name: string; 
    cpf: string; 
    nick: string; 
    gender: string; 
    phone: string; 
    address: string;
    observations: string; 
}

export interface PictureData{
    person_id: number,
    filename: string,
    originalname: string,
    url: string
}