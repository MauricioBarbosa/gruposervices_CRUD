import { createContext, ReactNode } from "react"

import { appConfig } from "../config/appConfig"
import AxiosApiProvider from "../providers/axios/AxiosApiProvider"
import CreatePersonData from "../types/CreatePersonData";

const api = new AxiosApiProvider(appConfig.backendUrl).getInstanceJson();

type PersonContextData = {
    postPerson: (data: CreatePersonData)=>Promise<{
        status: number,
        response: any
    }>
}

type PersonContextProps = {
    children: ReactNode
}

export const PersonContext = createContext({} as PersonContextData); 

export function PersonContextProvider({children}: PersonContextProps){
    
    async function postPerson(data: CreatePersonData):Promise<{status: number, response: any}>{
        const { status, response } = await api.post('/person/', data = data)
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
        <PersonContext.Provider value={{
            postPerson
        }}>
        {children}
        </PersonContext.Provider>
    )
}