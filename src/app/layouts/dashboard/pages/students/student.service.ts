import { Injectable } from '@angular/core';
import { IStudent } from './models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  students:IStudent[] = [{
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
  }];

  getStudents():IStudent[] {
    return this.students;
  };

  addStudent(student: IStudent): IStudent[]{
    this.students.push(student);

    return this.students;
  };

  deleteStudent(id:number): IStudent[]{
    this.students = this.students.filter((el, i) => el.id !== id);

    return this.students;
  }

  getNextId():number{
    return this.students.length + 1; 
  }

  editStudent(editingStudent: IStudent): IStudent[]{
    this.students = this.students.map((m) => m.id === editingStudent.id ? {...m, ...editingStudent} : m);

    return this.students;
  }
}
