import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PeopleDialogComponent } from '../../../people/components/people-dialog/people-dialog.component';
import { IPerson } from '../../../people/models';
import { IClass } from '../../models';

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrl: './class-dialog.component.scss'
})
export class ClassDialogComponent {
  classForm: FormGroup;
  buttonDisabled = false;

  constructor(private formBuilder:FormBuilder,
              private matDialogRef: MatDialogRef<PeopleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private editingClass?: [IClass, boolean],){
    this.classForm = this.formBuilder.group({
      Turn: ['', [Validators.required]],
      Subject: ['', [Validators.required]],
      HourFrom: ['', [Validators.required]],
      HourTo:['', Validators.required]
    });

    if(editingClass){
      this.classForm.patchValue(editingClass[0]);

      if(editingClass[1]){
        this.classForm.disable();
        this.buttonDisabled = true;
      }
    }
  }

  get turnControl(){
    return this.classForm.get('Turn');
  }

  get subjectControl(){
    return this.classForm.get('Subject');
  }

  get hourFromControl(){
    return this.classForm.get('HourFrom');
  }

  get hourToControl(){
    return this.classForm.get('HourTo');
  }

  onSave():void{
    if(this.classForm.invalid){
      this.classForm.markAllAsTouched();

      Swal.fire({
        title: 'Se deben completar todos los campos requeridos.',
        icon: "error"
      });
    }
    else{
      this.matDialogRef.close(this.classForm.value)
    }
  }
}
