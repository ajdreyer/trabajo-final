import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRol, IUser } from '../../models';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RoleServie } from '../../../role/role.service';
import { PeopleService } from '../../../people/people.service';
import { IPerson } from '../../../people/models';
import { Observable, forkJoin, map } from 'rxjs';
import { IUserForm } from '../../models/userForm.model';
import { Store } from '@ngrx/store';
import { selectLoadingUsersModal, selectPersonasList, selectRolesList, selectUsersError } from '../../store/user.selectors';
import { UserActions } from '../../store/user.actions';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class UserDialogComponent implements OnInit {
  userForm = new FormGroup<IUserForm>({
    personaId: new FormControl('', Validators.required),
    roleId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  loadingUserModal$: Observable<boolean>;

  personas$:  Observable<IPerson[]>;

  error$: Observable<unknown>;
  
  role$: Observable<IRol[]>;

  buttonDisabled = false;

  constructor(private matDialogRef: MatDialogRef<UserDialogComponent>,
              private rolService: RoleServie,
              private peopleService: PeopleService,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) private editingUser?: [IUser, boolean]){
    this.personas$ = this.store.select(selectPersonasList);
    this.role$ = this.store.select(selectRolesList);
    this.loadingUserModal$ = this.store.select(selectLoadingUsersModal);
    this.error$ = this.store.select(selectUsersError).pipe(map((err) => err as Error));

    if(editingUser){
      if(editingUser[0] !== undefined){
        this.userForm.patchValue(editingUser[0]);

        if(editingUser[1]){
          this.userForm.disable();
          this.buttonDisabled = true;
        }
      }
      
    }
  }

  ngOnInit(): void {
   this.loadFormData();
  }

  loadFormData(): void{
    this.store.dispatch(UserActions.loadPersonas());

    this.store.select(selectPersonasList);

    this.store.dispatch(UserActions.loadRoles());

    this.store.select(selectRolesList);
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
