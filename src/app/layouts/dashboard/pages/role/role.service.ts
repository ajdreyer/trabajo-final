import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { IRol, IUser } from "../users/models";

@Injectable({
    providedIn: 'root'
  })

export class RoleServie{
    constructor(private httpClient: HttpClient){
    
    }

    getRole(): Observable<IRol[]>{
        return this.httpClient.get<IRol[]>(`${environment.baseUrl}role`);
    }
}