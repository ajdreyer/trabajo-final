import { Injectable } from '@angular/core';
import { IClass } from './models';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  classes: IClass[] = [
    {
      Id: 1,
      Name: 'Clase 1'
    }
  ];

  constructor() {

   }

   getClasses(){
    return this.classes;
   }
}
