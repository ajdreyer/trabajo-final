import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { RegistrationActions } from './registration.actions';
import { RegistrationService } from '../registration.service';
import { CourseService } from '../../courses/course.service';
import { StudentService } from '../../students/student.service';


@Injectable()
export class RegistrationEffects {

  loadRegistrations$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.loadRegistrations),
      concatMap(() =>
        this.registrationService.getRegistrations().pipe(
          map(data => RegistrationActions.loadRegistrationsSuccess({ data })),
          catchError(error => of(RegistrationActions.loadRegistrationsFailure({ error }))))
      )
    );
  });

  createRegistration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistrationActions.createRegistrations),
      concatMap((action) =>
        this.registrationService.createRegistration(action.payload).pipe(
          map((data) => RegistrationActions.createRegistrationsSuccess({ data })),
          catchError((error) =>
            of(RegistrationActions.createRegistrationsFailure({ error }))
          )
        )
      )
    );
  });

  updateRegistration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistrationActions.updateRegistrations),
      concatMap((action) =>
        this.registrationService.updateRegistration(action.id, action.payload).pipe(
          map((data) => RegistrationActions.updateRegistrationsSuccess({ data })),
          catchError((error) =>
            of(RegistrationActions.updateRegistrationsFailure({ error }))
          )
        )
      )
    );
  });

  deleteRegistrationById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistrationActions.deleteRegistrationsById),
      concatMap((action) =>
        this.registrationService.deleteRegistration(action.id).pipe(
          map((data) => RegistrationActions.deleteRegistrationsByIdSuccess({ data })),
          catchError((error) =>
            of(RegistrationActions.deleteRegistrationsByIdFailure({ error }))
          )
        )
      )
    );
  });

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.loadCourses),
      concatMap(() =>
        this.courseService.getCourses().pipe(
          map(data => RegistrationActions.loadCoursesSuccess({ data })),
          catchError(error => of(RegistrationActions.loadCoursesFailure({ error }))))
      )
    );
  });

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.loadStudents),
      concatMap(() =>
        this.studentService.getStudents().pipe(
          map(data => RegistrationActions.loadStudentsSuccess({ data })),
          catchError(error => of(RegistrationActions.loadStudentsFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions,
              private registrationService: RegistrationService,
              private courseService: CourseService,
              private studentService: StudentService
  ) {}
}
