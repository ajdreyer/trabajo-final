import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ICourse, ICoursePayload } from './models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }
  
  getCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(`${environment.baseUrl}courses`);
  };

  createCourse(student: ICoursePayload){
    return this.httpClient.post<ICourse>(`${environment.baseUrl}courses`, student)
  };

  deleteCourse(id:string){
    return this.httpClient.delete<ICourse>(`${environment.baseUrl}courses/${id}`);
  }

  updateCourse(id:string, student: ICoursePayload): Observable<ICourse>{
    return this.httpClient.patch<ICourse>(`${environment.baseUrl}courses/${id}`, student);
  }
}
