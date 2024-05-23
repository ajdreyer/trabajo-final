import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StudentActions } from './student.actions';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { PeopleService } from '../../people/people.service';
import { RegistrationService } from '../../registrations/registration.service';


@Injectable()
export class StudentEffects {

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.loadStudents),
      concatMap(() =>
        this.studentService.getStudents().pipe(
          map(data => StudentActions.loadStudentsSuccess({ data })),
          catchError(error => of(StudentActions.loadStudentsFailure({ error }))))
      )
    );
  });

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.createStudent),
      concatMap((action) =>
        this.studentService.createStudent(action.payload).pipe(
          map((data) => StudentActions.createStudentSuccess({ data })),
          catchError((error) =>
            of(StudentActions.createStudentFailure({ error }))
          )
        )
      )
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      concatMap((action) =>
        this.studentService.updatePeople(action.id, action.payload).pipe(
          map((data) => StudentActions.updateStudentSuccess({ data })),
          catchError((error) =>
            of(StudentActions.updateStudentFailure({ error }))
          )
        )
      )
    );
  });

  deleteStudentById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.deleteStudentById),
      concatMap((action) =>
        this.studentService.deleteStudent(action.id).pipe(
          map((data) => StudentActions.deleteStudentByIdSuccess({ data })),
          catchError((error) =>
            of(StudentActions.deleteStudentByIdFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          StudentActions.loadStudentsFailure,
          StudentActions.createStudentFailure,
          StudentActions.updateStudentFailure,
          StudentActions.deleteStudentByIdFailure,
          StudentActions.loadPersonasFailure
        ),
        tap((action) => {
          if (action.error instanceof HttpErrorResponse) {
            Swal.fire({
              icon: 'error',
              text: action.error['message'],
            });
          }
        })
      );
    },
    { dispatch: false }
  );

  loadPersonas$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.loadPersonas),
      concatMap(() =>
        this.peopleService.getPeople().pipe(
          map(data => StudentActions.loadPersonasSuccess({ data })),
          catchError(error => of(StudentActions.loadPersonasFailure({ error }))))
      )
    );
  });

  loadRegistrationsByStudentId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadRegistrationsByStudentId),
      concatMap((action) =>
        this.registrationService.getRegistrationsByStudentId(action.studentId).pipe(
          map((data) => StudentActions.loadRegistrationsByStudentIdSuccess({ data })),
          catchError((error) =>
            of(StudentActions.loadRegistrationsByStudentIdFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, 
              private studentService: StudentService,
              private peopleService: PeopleService,
              private registrationService: RegistrationService
  ) {}
}
