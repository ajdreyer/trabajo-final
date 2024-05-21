import { FormControl } from "@angular/forms";

export interface IRegistrationForm{
    turn: FormControl<string | null>,
    subject: FormControl<string | null>,
    hourFrom: FormControl<string | null>,
    hourTo: FormControl<string | null>,
    courseId: FormControl<string | null>,
    studentId: FormControl<string | null> 
}