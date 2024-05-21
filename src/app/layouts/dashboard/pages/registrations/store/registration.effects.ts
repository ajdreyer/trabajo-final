import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { RegistrationActions } from './registration.actions';


@Injectable()
export class RegistrationEffects {

  loadRegistrations$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.loadRegistrations),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => RegistrationActions.loadRegistrationsSuccess({ data })),
          catchError(error => of(RegistrationActions.loadRegistrationsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
