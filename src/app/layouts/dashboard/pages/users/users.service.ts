import { Injectable } from "@angular/core";
import { IUser } from "./models";
import { Observable, catchError, delay, first, of, throwError } from "rxjs";

const USERS_DB: IUser[] = [
    {
      id: 1,
      firstName: "Alejandro",
      lastName: "Dreyer",
      email: "email@email.com",
      role: 'ADMIN',
      createdAt: new Date(),
      bornDate: new Date('04-01-1991')
    },
    {
      id: 2,
      firstName: "Roberto",
      lastName: "Perfumo",
      email: "email@email.com",
      role: 'USER',
      createdAt: new Date(),
      bornDate: new Date('05-02-1950')
    },
    {
      id: 3,
      firstName: "Patricio",
      lastName: "Toranzo",
      email: "email@email.com",
      role: 'USER',
      createdAt: new Date(),
      bornDate: new Date('04-01-1980')
    },
    {
      id: 4,
      firstName: "Esteban",
      lastName: "Fuertes",
      email: "email@email.com",
      role: 'USER',
      createdAt: new Date(),
      bornDate: new Date('08-17-1980')
    }
  ];

@Injectable({providedIn: 'root'})

export class UsersService{
    getUsers(): Observable<IUser[]>{
        return of(USERS_DB).pipe(delay(1500));
    }

    getUserById(id: number): Observable<IUser | undefined>{
        return of(USERS_DB.find((el) => el.id == id)).pipe(delay(1500));
    }
}
