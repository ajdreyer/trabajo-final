import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullNameClass'
})
export class FullNameClassPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): unknown {
    return 'Materia: ' + value[0] + ' - ' + 'Turno: ' +  value[1] + ' - ' + 'Horario: de ' + value[2] + ' a ' + value[3];
  }
}
