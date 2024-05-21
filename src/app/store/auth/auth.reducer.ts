import { createReducer } from "@ngrx/store";
import { IUser } from "../../layouts/dashboard/pages/users/models";
import { authActions } from "./auth.actions";

export interface IAuthState{
    authUser: null | IUser
}

export const initialState: IAuthState = {
    authUser: null
}

export const authFeatureName = 'auth';

export const authReducer = createReducer(initialState,
    // on(authActions.login, (state, action) => {

    // })
)