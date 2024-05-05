import { Injectable } from "@angular/core";
import { IUser, IUserPayload} from "./models";
import { Observable, catchError, concatMap, delay, first, forkJoin, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Injectable({providedIn: 'root'})

export class UsersService{

  constructor(private httpClient: HttpClient){
    
  }
  
  getUsers(): Observable<IUser[]>{
    return this.httpClient.get<IUser[]>(`${environment.baseUrl}users`);
  }

  getUserById(id: string): Observable<IUser | undefined>{
    return this.httpClient.get<IUser>(`${environment.baseUrl}users/${id}`);
  }

  createUser(user: IUserPayload): Observable<IUser>{
    return this.httpClient.post<IUser>(`${environment.baseUrl}users`, user)
  }

  updateUser(id:string, user: IUserPayload): Observable<IUser>{
    return this.httpClient.patch<IUser>(`${environment.baseUrl}users/${id}`, user);
  }
}
