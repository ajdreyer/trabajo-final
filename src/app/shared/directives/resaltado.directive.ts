import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(private elementRef: ElementRef) {
    console.log(elementRef);

    this.elementRef.nativeElement.style.fontWeight = 500;
    this.elementRef.nativeElement.style.backgroundColor = 'yellow';
   }

}
