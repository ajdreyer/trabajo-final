import { Component, Inject, OnInit } from '@angular/core';
import { IRegistration, IRegistrationForm } from '../../models';
import { FormControl, FormGroup } from '@angular/forms';
import { ICourse } from '../../../courses/models';
import { Observable, map } from 'rxjs';
import { IStudent } from '../../../students/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectCousesList, selectLoadingRegistrationModal, selectRegistrationError, selectStudentsList } from '../../store/registration.selectors';
import { RegistrationActions } from '../../store/registration.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrl: './registration-dialog.component.scss'
})
export class RegistrationDialogComponent implements OnInit {
  registrationForm = new FormGroup<IRegistrationForm>({
    turn: new FormControl(''),
    subject: new FormControl(''),
    hourFrom: new FormControl(''),
    hourTo: new FormControl(''),
    courseId: new FormControl(''),
    studentId: new FormControl('')
  });

  buttonDisabled = false;
  loadingRegistrationModal$: Observable<boolean>;

  courses$:  Observable<ICourse[]>;
  students$:  Observable<IStudent[]>;

  error$: Observable<unknown>;

  constructor(private matDialogRef: MatDialogRef<RegistrationDialogComponent>,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) private editingRegistration?: [IRegistration, boolean]){

    this.courses$ = this.store.select(selectCousesList);
    this.students$ = this.store.select(selectStudentsList);
    this.loadingRegistrationModal$ = this.store.select(selectLoadingRegistrationModal);
    this.error$ = this.store.select(selectRegistrationError).pipe(map((err) => err as Error));

    if(editingRegistration){
      this.registrationForm.patchValue(editingRegistration[0]);

      if(editingRegistration[1]){
        this.registrationForm.disable();
        this.buttonDisabled = true;
      }
    }
  }
  ngOnInit(): void {
    this.store.dispatch(RegistrationActions.loadCourses());
    this.store.select(selectCousesList);

    this.store.dispatch(RegistrationActions.loadStudents());
    this.store.select(selectStudentsList);
  }

  onSave():void{
    if(this.registrationForm.invalid){
      this.registrationForm.markAllAsTouched();

      Swal.fire({
        title: 'Se deben completar todos los campos requeridos.',
        icon: "error"
      });
    }
    else{
      this.matDialogRef.close(this.registrationForm.value)
    }
  }

  get turnControl(){
    return this.registrationForm.get('turn');
  }

  get subjectControl(){
    return this.registrationForm.get('subject');
  }

  get hourFromControl(){
    return this.registrationForm.get('hourFrom');
  }

  get hourToControl(){
    return this.registrationForm.get('hourTo');
  }

  get courseIdControl(){
    return this.registrationForm.get('courseId');
  }

  get studentIdControl(){
    return this.registrationForm.get('studentId');
  }
}
