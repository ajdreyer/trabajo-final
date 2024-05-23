import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { selectLoadingStudentModal, selectLoadingStudents, selectPersonasList, selectRegistrationsByStudentList, selectStudentError } from '../../store/student.selectors';
import { IRegistration } from '../../../registrations/models';
import { RegistrationActions } from '../../../registrations/store/registration.actions';
import { RegistrationService } from '../../../registrations/registration.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class StudentDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedRegistrationColumns: string[] = ['id', 'turn', 'subject', 'course', 'actions'];

  studentForm = new FormGroup<IStudentForm>({
    personaId: new FormControl(''),
    expedient: new FormControl('')
  });

  buttonDisabled = false;
  loadingStudentModal$: Observable<boolean>;
  registrationsByStudentId$: Observable<IRegistration[]>

  personas$:  Observable<IPerson[]>;

  error$: Observable<unknown>;

  loadGridRegistrations = false;

  studentId = '0';

  constructor(private matDialogRef: MatDialogRef<StudentDialogComponent>,
              private store: Store,
              private registrationService: RegistrationService,
              @Inject(MAT_DIALOG_DATA) private editingStudent?: [IStudent, boolean]){

    this.personas$ = this.store.select(selectPersonasList);
    this.registrationsByStudentId$ = this.store.select(selectRegistrationsByStudentList);
    this.loadingStudentModal$ = this.store.select(selectLoadingStudentModal);
    this.error$ = this.store.select(selectStudentError).pipe(map((err) => err as Error));

    if(editingStudent){
      if(editingStudent[0] !== undefined){
        this.studentForm.patchValue(editingStudent[0]);

        this.studentId = editingStudent[0].id;

        if(editingStudent[1]){
          this.studentForm.disable();
          this.buttonDisabled = true;
        }
      }
    }
  }
  ngOnDestroy(): void {
    this.loadGridRegistrations = false; 
  }
  ngAfterViewInit(): void {
    if(this.studentId !== '0'){
      this.loadRegistrations(this.studentId);
      this.loadGridRegistrations = true;
    }    
  }
  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadPersonas());

    this.store.select(selectPersonasList);
  }

  loadRegistrations(studentId: string):void{
    this.store.dispatch(StudentActions.loadRegistrationsByStudentId({studentId: studentId}));

    this.store.select(selectRegistrationsByStudentList);
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

  onDeleteRegistration(id:string):void{
    Swal.fire({
      title: "¿Está usted seguro que desea eliminar la inscripción?.",
      text: "La inscripción se eliminará de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.store.dispatch(RegistrationActions.deleteRegistrationsById({ id: id }));

        this.loadRegistrations(id);
      }
    })
  }
}
