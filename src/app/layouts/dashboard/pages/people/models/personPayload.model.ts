import { SchoolLevel } from ".";

export interface IPersonPayload{
    id:number | null,
    firstName: string | null,
    lastName:string | null,
    email: string | null,
    createdAt:Date | null,
    idNumber:number | null,
    bornDate: Date | null,
    schoolLevel:SchoolLevel | null,
    streetName:string | null,
    streetNumber:string | null,
    floor:number | null,
    department:string | null
}