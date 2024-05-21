import { FormControl } from "@angular/forms";

export interface IStudentForm{
    personaId: FormControl<string | null>,
    expedient: FormControl<string | null>
}