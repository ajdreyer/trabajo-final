import { FormControl } from "@angular/forms";
import { IPerson } from "../../people/models";
import { IRol } from "./user.model";

export interface IUserForm{
    id: FormControl<number | null>,
    person: FormControl<IPerson | null>,
    rol: FormControl<IRol | null>,
    name: FormControl<string | null>,
    password: FormControl<string | null>
}