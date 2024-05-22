import { Injectable } from '@angular/core';
import { ICourse } from './models';
import { Observable, of, delay } from 'rxjs';

let courses: ICourse[] = [
  {
    id: "1",
    name: 'Couse 1',
    Class: ''
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

  deleteCourses(id:string){
    return of(courses.filter((el, i) => el.id !== id));
  }

  getNextId():Observable<number>{
    return of(courses.length + 1); 
  }

  editCourses(id: string, course: ICourse){
    return of(courses.map((p) => p.id === id ? {...p, ...course} : p))
  }
}
