import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { RegistrationsComponent } from './registrations.component';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { RegistrationEffects } from './store/registration.effects';
import { StoreModule } from '@ngrx/store';
import { registrationFeature } from './store/registration.reducer';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    RegistrationsComponent,
    RegistrationDialogComponent
  ],
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
    SharedModule,
    StoreModule.forFeature(registrationFeature),
    EffectsModule.forFeature([RegistrationEffects])
  ],
  exports:[
    RegistrationsComponent
  ]
})
export class RegistrationsModule { }
