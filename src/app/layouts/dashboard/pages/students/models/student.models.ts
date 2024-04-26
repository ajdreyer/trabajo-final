import { ICourse } from "../../courses/models";
import { IPerson } from "../../people/models";

export type SchoolLevel = 'Primary' | 'Secondary'

export interface IStudent{
    id:number,
    People: IPerson,
    Expedient: string,
    Course: ICourse
}