import { Injectable } from '@angular/core';
import { IPerson } from './models';
import { Observable, delay, of } from 'rxjs';

let people:IPerson[] = [{
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

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor() { }

  

  getPeople(): Observable<IPerson[]> {
    return of(people).pipe(delay(1500));
  };

  addPeople(student: IPerson){
    people.push(student);

    return of(people);
  };

  deletePeople(id:number){
    return of(people.filter((el, i) => el.id !== id));
  }

  getNextId():Observable<number>{
    return of(people.length + 1); 
  }

  editPeople(id: number, person: IPerson){
    return of(people.map((p) => p.id === id ? {...p, ...person} : p))
  }
}
