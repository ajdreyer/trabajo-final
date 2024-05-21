import { Injectable } from '@angular/core';
import { IPerson, IPersonPayload } from './models';
import { Observable, count, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient){
    
  }

  getPeople(): Observable<IPerson[]> {
    return this.httpClient.get<IPerson[]>(`${environment.baseUrl}personas`);
  };

  addPeople(person: IPersonPayload): Observable<IPerson>{
    return this.httpClient.post<IPerson>(`${environment.baseUrl}people`, person)
  };

  deletePeople(id:string){
    return this.httpClient.delete<IPerson>(`${environment.baseUrl}people/${id}`);
  }

  getNextId():Observable<number>{
    return this.httpClient.get<IPerson[]>(`${environment.baseUrl}people`).pipe(count());
  }

  updatePeople(id:string, person: IPersonPayload): Observable<IPerson>{
    return this.httpClient.patch<IPerson>(`${environment.baseUrl}people/${id}`, person);
  }
}
