import { FormControl } from "@angular/forms";
import { IPerson } from "../../people/models";
import { ICourse } from "../../courses/models";

export interface IStudentForm{
    Id: FormControl<number | null>,
    People: FormControl<IPerson | null>,
    Expedient: FormControl<string | null>,
    Course: FormControl<ICourse | null>
}