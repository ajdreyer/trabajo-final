import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassDialogComponent } from './components/class-dialog/class-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassDialogComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    SharedModule
  ],
  exports:[
    ClassesComponent
  ]
})
export class ClassesModule { }
