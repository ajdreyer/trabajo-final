import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../../core/services/auth.service';


@Injectable()
export class AuthEffects {

  loginAuths$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.loginAuths),
      concatMap((action) =>
        this.authService.login(action.payload).pipe(
          map(data => AuthActions.loginAuthsSuccess({ data })),
          catchError(error => of(AuthActions.loginAuthsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions,
              private authService: AuthService) {}
}
