import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { PeopleDialogComponent } from './components/people-dialog/people-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    PeopleComponent,
    PeopleDialogComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    SharedModule
  ],
  exports:[
    PeopleComponent
  ]
})
export class PeopleModule {
  
 }
