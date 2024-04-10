import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formFieldValidationError'
})
export class FormFieldValidationErrorPipe implements PipeTransform {

  transform(value: ValidationErrors | undefined | null, ...args: unknown[]): unknown {
    
    if(value){
      let messages: string[] = [];

      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const element = value[key];
          if(key === 'required'){
            messages.push('Este campo es requerido');
          }
          if(key === 'pattern'){
            messages.push('No se cumple con el formato requerido.');
          }
          if(key === 'maxlength'){
            messages.push(`No puede tener mas de ${element.requiredLength} caracteres`);
          }
        }
      }

      return messages.join('. ');
    }

    return null;
  }
}
