import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IStudent, IStudentPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { IPerson } from '../../people/models';
import { ICourse } from '../../courses/models';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: IStudent[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),

    'Create Student': props<{ payload: IStudentPayload }>(),
    'Create Student Success': props<{ data: IStudent }>(),
    'Create Student Failure': props<{ error: unknown }>(),

    'Update Student': props<{ id: string, payload: IStudentPayload }>(),
    'Update Student Success': props<{ data: IStudent }>(),
    'Update Student Failure': props<{ error: unknown }>(),

    'Delete Student By Id': props<{ id: string }>(),
    'Delete Student By Id Success': props<{ data: IStudent }>(),
    'Delete Student By Id Failure': props<{ error: HttpErrorResponse }>(),

    'Load Personas': emptyProps(),
    'Load Personas Success': props<{ data: IPerson[] }>(),
    'Load Personas Failure': props<{ error: unknown }>(),
  }
});
