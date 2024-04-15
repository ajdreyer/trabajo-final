import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassDialogComponent } from './components/class-dialog/class-dialog.component';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassDialogComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule
  ],
  exports:[
    ClassesComponent
  ]
})
export class ClassesModule { }
