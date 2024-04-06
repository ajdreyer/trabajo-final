import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../models';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(private formBuilder:FormBuilder, 
              private matDialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private editingUser?: IUser){
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$')]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}')]],
      role:['USER', [Validators.required]]
    });

    if(editingUser){
      this.userForm.patchValue(editingUser);
    }
  }

  onSave():void{

    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }
    else{
      this.matDialogRef.close(this.userForm.value)
    }

  }
}
