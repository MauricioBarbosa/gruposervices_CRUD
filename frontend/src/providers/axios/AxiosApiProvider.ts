import axios from 'axios';
import IApiProvider from "../IApiProvider";


export default class AxiosApiProvider implements IApiProvider{

    constructor(private url: string){}

    getInstanceJson() {
        const api = axios.create({
            baseURL: this.url
        })

        api.defaults.headers.common['Content-Type'] = 'application/json'; 

        return api;
    }

    getInstanceFile() {
        const apiFile = axios.create({
            baseURL: this.url
        })

        apiFile.defaults.headers.common['Content-Type'] = 'multipart/form-data';

        return apiFile; 
    }
}