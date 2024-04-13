import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): unknown {
    return value[0] + ' ' + value[1];
  }

}
