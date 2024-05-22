import { FormControl } from "@angular/forms";

export interface ICourseForm{
    Id: FormControl<number | null>,
    Class: FormControl<string| null>,
    Name: FormControl<string | null>
}