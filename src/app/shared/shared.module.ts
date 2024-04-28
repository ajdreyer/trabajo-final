import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormFieldValidationErrorPipe } from './pipes/form-field-validation-error.pipe';
import { FullNamePipe } from './pipes/full-name.pipe';
import { Tamanio20TitulosDirective } from './directives/tamanio-20-titulos.directive';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FullNameClassPipe } from './pipes/full-name-class.pipe';

@NgModule({
  declarations: [
    FormFieldValidationErrorPipe,
    FullNamePipe,
    Tamanio20TitulosDirective,
    FullNameClassPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    FormFieldValidationErrorPipe,
    FullNamePipe,
    FullNameClassPipe,
    Tamanio20TitulosDirective,
    MatListModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
