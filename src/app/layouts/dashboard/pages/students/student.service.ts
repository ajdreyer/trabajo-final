import { Injectable } from '@angular/core';
import { IStudent } from './models';
import { Observable, delay, of } from 'rxjs';

let students:IStudent[] = [{
  id: 1,
  People: {
    id: 1,
    firstName: 'Alejandro',
    lastName: 'Dreyer',
    email: 'alejandro.dreyer91@gmail.com',
    createdAt: new Date(),
    bornDate: new Date('1991-01-04'),
    idNumber: 28456123,
    schoolLevel: 'Secondary',
    streetName: 'Callao',
    streetNumber: '973',
    floor: 2,
    department: 'B'
  },
  Expedient: 'ABC1258SS',
  Course: {
    Id: 1,
      Name: 'Couse 1',
      Class: {
        Id: 1,
        Name: 'Clase1'
      }
  }
}];

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }
  
  getStudents(): Observable<IStudent[]> {
    return of(students).pipe(delay(1500));
  };

  addStudent(student: IStudent){
    students.push(student);

    return of(students);
  };

  deleteStudent(id:number){
    return of(students.filter((el, i) => el.id !== id));
  }

  getNextId():Observable<number>{
    return of(students.length + 1); 
  }

  editStudent(id: number, student: IStudent){
    return of(students.map((st) => st.id === id ? {...st, ...student} : st))
  }
}
