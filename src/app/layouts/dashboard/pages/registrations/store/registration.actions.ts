import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IRegistration, IRegistrationPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { ICourse } from '../../courses/models';
import { IStudent } from '../../students/models';

export const RegistrationActions = createActionGroup({
  source: 'Registration',
  events: {
    'Load Registrations': emptyProps(),
    'Load Registrations Success': props<{ data: IRegistration[] }>(),
    'Load Registrations Failure': props<{ error: unknown }>(),

    'Create Registrations': props<{ payload: IRegistrationPayload }>(),
    'Create Registrations Success': props<{ data: IRegistration }>(),
    'Create Registrations Failure': props<{ error: unknown }>(),

    'Update Registrations': props<{ id: string, payload: IRegistrationPayload }>(),
    'Update Registrations Success': props<{ data: IRegistration }>(),
    'Update Registrations Failure': props<{ error: unknown }>(),

    'Delete Registrations By Id': props<{ id: string }>(),
    'Delete Registrations By Id Success': props<{ data: IRegistration }>(),
    'Delete Registrations By Id Failure': props<{ error: unknown }>(),

    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: ICourse[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),

    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: IStudent[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),
  }
});
