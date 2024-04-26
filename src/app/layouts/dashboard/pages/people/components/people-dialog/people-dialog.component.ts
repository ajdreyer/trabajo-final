import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IPerson } from '../../models';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-people-dialog',
  templateUrl: './people-dialog.component.html',
  styleUrl: './people-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class PeopleDialogComponent {
  peopleForm: FormGroup;
  buttonDisabled = false;

  constructor(private formBuilder:FormBuilder,
              private matDialogRef: MatDialogRef<PeopleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private editingPeople?: [IPerson, boolean],){
    this.peopleForm = this.formBuilder.group({
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

    if(editingPeople){
      this.peopleForm.patchValue(editingPeople[0]);

      if(editingPeople[1]){
        this.peopleForm.disable();
        this.buttonDisabled = true;
      }
    }
  }

  onSave():void{
    if(this.peopleForm.invalid){
      this.peopleForm.markAllAsTouched();

      Swal.fire({
        title: 'Se deben completar todos los campos requeridos.',
        icon: "error"
      });
    }
    else{
      this.matDialogRef.close(this.peopleForm.value)
    }
  }

  get firstNameControl(){
    return this.peopleForm.get('firstName');
  }

  get lastNameControl(){
    return this.peopleForm.get('lastName');
  }

  get emailControl(){
    return this.peopleForm.get('email');
  }

  get bornDateControl(){
    return this.peopleForm.get('bornDate');
  }

  get idNumberControl(){
    return this.peopleForm.get('idNumber');
  }

  get schoolLevelControl(){
    return this.peopleForm.get('schoolLevel');
  }

  get streetNameControl(){
    return this.peopleForm.get('streetName');
  }

  get streetNumberControl(){
    return this.peopleForm.get('streetNumber');
  }
}
