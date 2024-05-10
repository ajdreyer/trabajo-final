import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UsersModule } from './pages/users/users.module';
import { StudentsModule } from './pages/students/students.module';
import { SharedModule } from '../../shared/shared.module';
import { ClassesModule } from './pages/classes/classes.module';
import { CoursesModule } from './pages/courses/courses.module';
import { PeopleModule } from './pages/people/people.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    UsersModule,
    StudentsModule,
    SharedModule,
    ClassesModule,
    CoursesModule,
    PeopleModule
  ],
  exports:[
    DashboardComponent,
  ]
})
export class DashboardModule { 
  
}
