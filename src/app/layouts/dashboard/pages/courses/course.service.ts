import { Injectable } from '@angular/core';
import { ICourse } from './models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: ICourse[] = [
    {
      Id: 1,
      Name: 'Couse 1'
    }
  ];

  constructor() { }

  getCourses(){
    return this.courses;
  }
}
