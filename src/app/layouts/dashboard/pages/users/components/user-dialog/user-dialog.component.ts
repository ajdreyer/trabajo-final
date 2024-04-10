import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../models';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(private formBuilder:FormBuilder, 
              private matDialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private editingUser?: IUser){
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(6), Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?<!\s)$")]],
      lastName: ['', [Validators.required]],//, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?<!\s)$")]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}')]],
      role:['USER', [Validators.required]],
      bornDate:['', Validators.required]
    });

    if(editingUser){
      this.userForm.patchValue(editingUser);
    }
  }

  get firstNameControl(){
    return this.userForm.get('firstName');
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
