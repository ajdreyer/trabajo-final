import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { IClass } from './models';

let classes: IClass[] = [
  {
    Id: 1,
    Turn: 'Mañana',
    Subject: 'Matemática',
    HourFrom: '09:00',
    HourTo: '12:30'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor() { }
  
  getClasses(): Observable<IClass[]> {
    return of(classes).pipe(delay(1500));
  };

  addClass(student: IClass){
    classes.push(student);

    return of(classes);
  };

  deleteClass(id:number){
    return of(classes.filter((el, i) => el.Id !== id));
  }

  getNextId():Observable<number>{
    return of(classes.length + 1); 
  }

  editClass(id: number, clase: IClass){
    return of(classes.map((st) => st.Id === id ? {...st, ...clase } : st))
  }
}