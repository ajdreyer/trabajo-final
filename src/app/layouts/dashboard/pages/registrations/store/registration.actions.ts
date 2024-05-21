import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IRegistration } from '../models';

export const RegistrationActions = createActionGroup({
  source: 'Registration',
  events: {
    'Load Registrations': emptyProps(),
    'Load Registrations Success': props<{ data: IRegistration[] }>(),
    'Load Registrations Failure': props<{ error: unknown }>(),
  }
});
