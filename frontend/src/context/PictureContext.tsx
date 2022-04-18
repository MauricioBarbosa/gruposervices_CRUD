import { createContext, ReactNode } from "react"; 
import { appConfig } from "../config/appConfig";
import AxiosApiProvider from "../providers/axios/AxiosApiProvider";

const apiFile = new AxiosApiProvider(appConfig.backendUrl).getInstanceFile(); 
const api = new AxiosApiProvider(appConfig.backendUrl).getInstanceJson();

type PictureContextData = {
    postPicture: (id: number, data: FormData) => Promise<{
        status: number,
        response: any
    }>

    putPicture: (id: number, data: FormData) => Promise<{
        status: number,
        response: any
    }>
    
    deletePicture: (id: number)=> Promise<{
        status: number,
        response: any
    }>
}

type PictureContextProps = {
    children: ReactNode; 
}

export const PictureContext = createContext({} as PictureContextData); 

export function PictureContextProvider({children}: PictureContextProps){

    async function postPicture(id: number, data: FormData): Promise<{
        status: number,
        response: any
    }> {
        const { status, response } = await apiFile.post(`/person/picture/${id}`,
         data = data).then(response=>{
             return { status: response.status, response: response.data }
         })
         .catch((error) =>{
            return { status: 404, response: {
                message: "Unhandled Error"
            }}
        })

        return {status, response}; 
    }

    async function putPicture(id: number, data: FormData): Promise<{
        status: number,
        response: any
    }>{
        const { status, response } = await apiFile.put(`/person/picture/${id}`,
         data = data).then(response=>{
             return { status: response.status, response: response.data }
         })
         .catch((error) =>{
            return { status: 404, response: {
                message: "Unhandled Error"
            }}
        })

        return {status, response};
    }

    async function deletePicture(id: number): Promise<{
        status: number,
        response: any
    }>{
        const { status, response } = await api.delete(`/person/picture/${id}`)
        .then(response =>{
            return { status: response.status, response: response.data }
        })
        .catch((error) =>{
            return { status: 404, response: {
                message: "Unhandled Error"
            }}
        })

        return { status, response };
    }

    return (
        <PictureContext.Provider value={{
            postPicture,
            putPicture,
            deletePicture
        }}>
            {children}
        </PictureContext.Provider>
    )
}