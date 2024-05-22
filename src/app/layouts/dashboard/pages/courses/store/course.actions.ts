import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICourse, ICoursePayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: ICourse[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),

    'Create Courses': props<{ payload: ICoursePayload }>(),
    'Create Courses Success': props<{ data: ICourse }>(),
    'Create Courses Failure': props<{ error: unknown }>(),

    'Update Courses': props<{ id: string, payload: ICoursePayload }>(),
    'Update Courses Success': props<{ data: ICourse }>(),
    'Update Courses Failure': props<{ error: unknown }>(),

    'Delete Courses By Id': props<{ id: string }>(),
    'Delete Courses By Id Success': props<{ data: ICourse }>(),
    'Delete Courses By Id Failure': props<{ error: HttpErrorResponse }>()
  }
});
