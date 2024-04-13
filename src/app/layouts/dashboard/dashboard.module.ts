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
import { ProductsModule } from './pages/products/products.module';
import { Clase09RxjsModule } from './pages/clase-09-rxjs/clase-09-rxjs.module';
import { SharedModule } from '../../shared/shared.module';

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
    ProductsModule,
    Clase09RxjsModule,
    SharedModule
  ],
  exports:[
    DashboardComponent,
  ]
})
export class DashboardModule { 
  
}
