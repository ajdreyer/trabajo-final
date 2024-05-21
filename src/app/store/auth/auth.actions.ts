import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginRequest } from "../../layouts/auth/models";

export const authActions = createActionGroup({
    source: 'Auth',
    events:{
        login: props<{payload: LoginRequest}>()
    },
})