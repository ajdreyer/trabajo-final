import { Injectable } from '@angular/core';
import { ICourse } from './models';
import { Observable, of, delay } from 'rxjs';

let courses: ICourse[] = [
  {
    Id: 1,
    Name: 'Couse 1',
    Class: {
      Id: 1,
      Turn: 'Mañana',
      Subject: 'Matemática',
      HourFrom: '09:00',
      HourTo: '12:30'
    }
  }
];

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }  

  getCourses(): Observable<ICourse[]> {
    return of(courses).pipe(delay(1500));
  };

  addCourses(course: ICourse){
    courses.push(course);

    return of(courses);
  };

  deleteCourses(id:number){
    return of(courses.filter((el, i) => el.Id !== id));
  }

  getNextId():Observable<number>{
    return of(courses.length + 1); 
  }

  editCourses(id: number, course: ICourse){
    return of(courses.map((p) => p.Id === id ? {...p, ...course} : p))
  }
}
