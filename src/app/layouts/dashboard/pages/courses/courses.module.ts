import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ],
  exports:[
    CoursesComponent
  ]
})
export class CoursesModule { }
