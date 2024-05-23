import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IRol, IUser, IUserPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { IPerson } from '../../people/models';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: IUser[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),

    'Create Users': props<{ payload: IUserPayload }>(),
    'Create Users Success': props<{ data: IUser }>(),
    'Create Users Failure': props<{ error: unknown }>(),

    'Update Users': props<{ id: string, payload: IUserPayload }>(),
    'Update Users Success': props<{ data: IUser }>(),
    'Update Users Failure': props<{ error: unknown }>(),

    'Delete Users By Id': props<{ id: string }>(),
    'Delete Users By Id Success': props<{ data: IUser }>(),
    'Delete Users By Id Failure': props<{ error: HttpErrorResponse }>(),

    'Load Personas': emptyProps(),
    'Load Personas Success': props<{ data: IPerson[] }>(),
    'Load Personas Failure': props<{ error: unknown }>(),

    'Load Roles': emptyProps(),
    'Load Roles Success': props<{ data: IRol[] }>(),
    'Load Roles Failure': props<{ error: unknown }>()
  }
});
