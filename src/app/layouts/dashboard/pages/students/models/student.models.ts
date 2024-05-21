import { ICourse } from "../../courses/models";
import { IPerson } from "../../people/models";

export type SchoolLevel = 'Primary' | 'Secondary'

export interface IStudent{
    id:string,
    personaId: string,
    persona?: IPerson,
    expedient: string
}