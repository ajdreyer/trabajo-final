import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRol, IUser } from '../../models';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RoleServie } from '../../../role/role.service';
import { PeopleService } from '../../../people/people.service';
import { IPerson } from '../../../people/models';
import { forkJoin } from 'rxjs';
import { IUserForm } from '../../models/userForm.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class UserDialogComponent implements OnInit {
  userForm = new FormGroup<IUserForm>({
    id: new FormControl(),
    person: new FormControl(null, Validators.required),
    rol: new FormControl(null, Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  buttonDisabled = false;
  loading = false;

  people: IPerson[] = [];
  role: IRol[] = [];

  constructor(private matDialogRef: MatDialogRef<UserDialogComponent>,
              private rolService: RoleServie,
              private peopleService: PeopleService,
              @Inject(MAT_DIALOG_DATA) private editingUser?: IUser){
    if(editingUser){
      this.userForm.patchValue(editingUser);
    }
  }

  ngOnInit(): void {
    this.loading = true;
    forkJoin(
      [
        this.peopleService.getPeople(),
        this.rolService.getRole()
      ]
    ).subscribe({
      next:(value) => {
        
        this.people = value[0];
        this.role = value[1];
      },
      complete:() => {
        this.loading = false;
      }
    });
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
