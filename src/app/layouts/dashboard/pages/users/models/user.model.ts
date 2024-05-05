import { IPerson } from "../../people/models";

export type UserRole = 'ADMIN' | 'USER'

export interface IUser{
    id:number,
    person: IPerson,
    role: IRol,
    name: string,
    password: string
}

export interface IRol{
    id:number,
    name: string
}