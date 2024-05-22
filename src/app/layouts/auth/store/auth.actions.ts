import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequest } from '../models';
import { IUser } from '../../dashboard/pages/users/models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Auths': props<{ payload: LoginRequest }>(),
    'Login Auths Success': props<{ data: IUser[] }>(),
    'Login Auths Failure': props<{ error: unknown }>(),
  }
});
