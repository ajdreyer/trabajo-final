import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, concatMap, filter, find, first, iif, map, of, take, tap, throwError } from "rxjs";
import { IUser } from "../../layouts/dashboard/pages/users/models";
import { Router } from "@angular/router";
import { LoginRequest } from "../../layouts/auth/models";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Guid } from "guid-typescript";

@Injectable({
    providedIn: 'root'
})

export class AuthService
{
    private _authUser$ = new BehaviorSubject<IUser | null>(null);
    public authUser$ = this._authUser$.asObservable();

    currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient) {}
    
    login(credentials:LoginRequest): Observable<IUser[]> {
      return this.httpClient.get<IUser[]>(`${environment.baseUrl}users?person.email=${credentials.email}&password=${credentials.password}`).pipe(
        tap((user: IUser[]) => {
          if(user[0]){
            let loggedUser: IUser = {
              id: user[0].id,
              person: {
                id: user[0].person.id,
                firstName: user[0].person.firstName,
                lastName: user[0].person.lastName,
                email: user[0].person.email,
                createdAt: user[0].person.createdAt,
                bornDate: user[0].person.bornDate,
                idNumber: user[0].person.idNumber,
                schoolLevel: user[0].person.schoolLevel,
                streetName: user[0].person.streetName,
                streetNumber: user[0].person.streetNumber,
                floor: user[0].person.floor,
                department: user[0].person.department
              },
              role: {
                id: user[0].role.id,
                name: user[0].role.name
              },
              name: user[0].name,
              password: user[0].password
            };

            this._authUser$.next(loggedUser);
            this.currentUserLoginOn.next(true);
          }else{
            alert('Datos de usuario incorrectos');            
          }
          
        }),
        catchError(this.handleError)
      );
    }

    private handleError(error:HttpErrorResponse){
      if(error.status===0){
        console.error('Se ha producio un error ', error.error);
      }
      else{
        console.error('Backend retornó el código de estado ', error.status, error.error);
      }
      return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
    }
    
    logout(): void {
      this._authUser$.next(null);
      localStorage.removeItem('accessToken');
    }
}