import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegistration, IRegistrationPayload } from './models';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class RegistrationService {
    constructor(private httpClient: HttpClient) { }

    getRegistrations(): Observable<IRegistration[]>{
        return this.httpClient.get<IRegistration[]>(`${environment.baseUrl}registrations?_embed=course&_embed=student`)
    }

    getRegistrationsByStudentId(studentId: string): Observable<IRegistration[]>{
        return this.httpClient.get<IRegistration[]>(`${environment.baseUrl}registrations?_embed=course&_embed=student&student.id=${studentId}`)
    }

    createRegistration(registration: IRegistrationPayload){
        return this.httpClient.post<IRegistration>(`${environment.baseUrl}registrations`, registration);
    }

    deleteRegistration(id: string){
        return this.httpClient.delete<IRegistration>(`${environment.baseUrl}registrations/${id}`);
    }

    updateRegistration(id:string, student: IRegistrationPayload): Observable<IRegistration>{
        return this.httpClient.patch<IRegistration>(`${environment.baseUrl}registrations/${id}`, student);
    }
  }