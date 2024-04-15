import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {

  @Input()
  visible = false;

  @Output()
  visibleChange = new EventEmitter();
}
