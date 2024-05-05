import { IPerson } from "../../people/models";
import { IRol} from "./user.model";

export interface IUserPayload{
    person: IPerson | null,
    rol: IRol | null,
    name: string | null,
    password: string | null
}