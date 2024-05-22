import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseActions } from './course.actions';
import { CourseService } from '../course.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Injectable()
export class CourseEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadCourses),
      concatMap(() =>
        this.courseService.getCourses().pipe(
          map(data => CourseActions.loadCoursesSuccess({ data })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error }))))
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.createCourses),
      concatMap((action) =>
        this.courseService.createCourse(action.payload).pipe(
          map((data) => CourseActions.createCoursesSuccess({ data })),
          catchError((error) =>
            of(CourseActions.createCoursesFailure({ error }))
          )
        )
      )
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.updateCourses),
      concatMap((action) =>
        this.courseService.updateCourse(action.id, action.payload).pipe(
          map((data) => CourseActions.updateCoursesSuccess({ data })),
          catchError((error) =>
            of(CourseActions.updateCoursesFailure({ error }))
          )
        )
      )
    );
  });

  deleteCourseById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.deleteCoursesById),
      concatMap((action) =>
        this.courseService.deleteCourse(action.id).pipe(
          map((data) => CourseActions.deleteCoursesByIdSuccess({ data })),
          catchError((error) =>
            of(CourseActions.deleteCoursesByIdFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CourseActions.loadCoursesFailure,
          CourseActions.createCoursesFailure,
          CourseActions.updateCoursesFailure,
          CourseActions.deleteCoursesByIdFailure
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


  constructor(private actions$: Actions,
              private courseService: CourseService
  ) {}
}
