export interface IPictureProvider{
    delete(file: string): Promise<boolean>
    checkIfExists(file: string): Promise<boolean>
}