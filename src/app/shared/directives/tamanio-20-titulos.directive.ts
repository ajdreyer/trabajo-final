import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTamanio20Titulos]'
})
export class Tamanio20TitulosDirective {

  constructor(private elementRef: ElementRef) { 
    elementRef.nativeElement.style.fontSize = '20px';
  }

}
