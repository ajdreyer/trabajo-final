import { Injectable } from '@angular/core';
import { ICourse } from './models';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: ICourse[] = [
    {
      Id: 1,
      Name: 'Couse 1',
      Class: {
        Id: 1,
        Name: 'Clase1'
      }
    }
  ];

  constructor() { }

  getCourses(): Observable<ICourse[]> {
    return of(this.courses).pipe(delay(1500));
  };
}
