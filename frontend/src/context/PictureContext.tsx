import { createContext, ReactNode } from "react"; 
import { appConfig } from "../config/appConfig";
import AxiosApiProvider from "../providers/axios/AxiosApiProvider";

const apiFile = new AxiosApiProvider(appConfig.backendUrl).getInstanceFile(); 

type PictureContextData = {
    postPicture: (id: number, data: FormData) => Promise<{
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


    return (
        <PictureContext.Provider value={{
            postPicture
        }}>
            {children}
        </PictureContext.Provider>
    )
}