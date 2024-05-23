import { FormControl } from "@angular/forms";
import { IPerson } from "../../people/models";
import { IRol } from "./user.model";

export interface IUserForm{
    personaId: FormControl<string | null>,
    roleId: FormControl<string | null>,
    name: FormControl<string | null>,
    password: FormControl<string | null>
}