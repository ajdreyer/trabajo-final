import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UserActions } from './user.actions';
import { UsersService } from '../users.service';
import { PeopleService } from '../../people/people.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleServie } from '../../role/role.service';


@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.userService.getUsers().pipe(
          map(data => UserActions.loadUsersSuccess({ data })),
          catchError(error => of(UserActions.loadUsersFailure({ error }))))
      )
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUsers),
      concatMap((action) =>
        this.userService.createUser(action.payload).pipe(
          map((data) => UserActions.createUsersSuccess({ data })),
          catchError((error) =>
            of(UserActions.createUsersFailure({ error }))
          )
        )
      )
    );
  });

  updatUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUsers),
      concatMap((action) =>
        this.userService.updateUser(action.id, action.payload).pipe(
          map((data) => UserActions.updateUsersSuccess({ data })),
          catchError((error) =>
            of(UserActions.updateUsersFailure({ error }))
          )
        )
      )
    );
  });

  deleteUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUsersById),
      concatMap((action) =>
        this.userService.deleteUser(action.id).pipe(
          map((data) => UserActions.deleteUsersByIdSuccess({ data })),
          catchError((error) =>
            of(UserActions.deleteUsersByIdFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          UserActions.loadPersonasFailure,
          UserActions.createUsersFailure,
          UserActions.updateUsersFailure,
          UserActions.deleteUsersByIdFailure,
          UserActions.loadPersonasFailure
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
      ofType(UserActions.loadPersonas),
      concatMap(() =>
        this.personaService.getPeople().pipe(
          map(data => UserActions.loadPersonasSuccess({ data })),
          catchError(error => of(UserActions.loadPersonasFailure({ error }))))
      )
    );
  });

  loadRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadRoles),
      concatMap(() =>
        this.roles.getRole().pipe(
          map(data => UserActions.loadRolesSuccess({ data })),
          catchError(error => of(UserActions.loadRolesFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions,
              private userService: UsersService,
              private personaService: PeopleService,
              private roles: RoleServie
  ) {}
}
