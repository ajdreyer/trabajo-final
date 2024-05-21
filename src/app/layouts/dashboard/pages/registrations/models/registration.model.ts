import { ICourse } from "../../courses/models"
import { IStudent } from "../../students/models"

export interface IRegistration{
    id: string,
    turn: string,
    subject: string,
    hourFrom:string,
    hourTo: string,
    courseId: string,
    course: ICourse,
    studentId: string,
    student: IStudent
}