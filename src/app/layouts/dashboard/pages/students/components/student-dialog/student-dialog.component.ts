import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudent } from '../../models';
import { provideNativeDateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class StudentDialogComponent {
  studentForm: FormGroup;

  constructor(private formBuilder:FormBuilder,
              private matDialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private editingStudent?: [IStudent, boolean],){
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}')]],
      bornDate:['', Validators.required],
      idNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      schoolLevel: ['', Validators.required],
      streetName:['', Validators.required],
      streetNumber: ['', Validators.required],
      floor: [''],
      department:['']
    });

    if(editingStudent){
      this.studentForm.patchValue(editingStudent[0]);

      if(editingStudent[1]){
        this.studentForm.disable();
      }
    }
  }

  onSave():void{
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();

      Swal.fire({
        title: 'Se deben completar todos los campos requeridos.',
        icon: "error"
      });
    }
    else{
      this.matDialogRef.close(this.studentForm.value)
    }
  }

  get firstNameControl(){
    return this.studentForm.get('firstName');
  }

  get lastNameControl(){
    return this.studentForm.get('lastName');
  }

  get emailControl(){
    return this.studentForm.get('email');
  }

  get bornDateControl(){
    return this.studentForm.get('bornDate');
  }

  get idNumberControl(){
    return this.studentForm.get('idNumber');
  }

  get schoolLevelControl(){
    return this.studentForm.get('schoolLevel');
  }

  get streetNameControl(){
    return this.studentForm.get('streetName');
  }

  get streetNumberControl(){
    return this.studentForm.get('streetNumber');
  }
}
