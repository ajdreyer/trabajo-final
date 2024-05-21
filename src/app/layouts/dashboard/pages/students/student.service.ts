import { Injectable } from '@angular/core';
import { IStudent, IStudentPayload } from './models';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }
  
  getStudents(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>(`${environment.baseUrl}students?_embed=persona&_embed=course`);
  };

  createStudent(student: IStudentPayload){
    return this.httpClient.post<IStudent>(`${environment.baseUrl}students`, student)
  };

  deleteStudent(id:string){
    return this.httpClient.delete<IStudent>(`${environment.baseUrl}students/${id}`);
  }

  updatePeople(id:string, student: IStudentPayload): Observable<IStudent>{
    return this.httpClient.patch<IStudent>(`${environment.baseUrl}students/${id}`, student);
  }
}
