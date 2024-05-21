import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationDialogComponent } from './pages/components/registration-dialog/registration-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    RegistrationDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
  ],
  exports:[
    DashboardComponent,
  ]
})
export class DashboardModule { 
  
}
