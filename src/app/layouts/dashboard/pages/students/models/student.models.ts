export type SchoolLevel = 'Primary' | 'Secondary'

export interface IStudent{
    id:number,
    firstName: string,
    lastName:string,
    email: string,
    createdAt:Date,
    IdNumber:number,
    bornDate: Date,
    schoolLevel:SchoolLevel,
    streetName:string,
    streetNumber:string,
    floor:number,
    department:string
}