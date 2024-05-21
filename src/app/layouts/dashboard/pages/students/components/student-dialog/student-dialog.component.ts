import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudent, IStudentForm } from '../../models';
import { provideNativeDateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';
import { IPerson } from '../../../people/models';
import { ICourse } from '../../../courses/models';
import { PeopleService } from '../../../people/people.service';
import { CourseService } from '../../../courses/course.service';
import { Observable, forkJoin, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { StudentActions } from '../../store/student.actions';
import { selectLoadingStudentModal, selectLoadingStudents, selectPersonasList, selectStudentError } from '../../store/student.selectors';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class StudentDialogComponent implements OnInit {

  studentForm = new FormGroup<IStudentForm>({
    personaId: new FormControl(''),
    expedient: new FormControl('')
  });

  buttonDisabled = false;
  loadingStudentModal$: Observable<boolean>;

  personas$:  Observable<IPerson[]>;

  error$: Observable<unknown>;

  constructor(private matDialogRef: MatDialogRef<StudentDialogComponent>,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) private editingStudent?: [IStudent, boolean]){

    this.personas$ = this.store.select(selectPersonasList);
    this.loadingStudentModal$ = this.store.select(selectLoadingStudentModal);
    this.error$ = this.store.select(selectStudentError).pipe(map((err) => err as Error));

    if(editingStudent){
      this.studentForm.patchValue(editingStudent[0]);

      if(editingStudent[1]){
        this.studentForm.disable();
        this.buttonDisabled = true;
      }
    }
  }
  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadPersonas());

    this.store.select(selectPersonasList);
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
}
