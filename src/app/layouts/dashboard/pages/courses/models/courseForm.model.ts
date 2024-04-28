import { FormControl } from "@angular/forms";
import { IClass } from "../../classes/models";

export interface ICourseForm{
    Id: FormControl<number | null>,
    Class: FormControl<IClass | null>,
    Name: FormControl<string | null>
}