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
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class StudentDialogComponent implements OnInit {

  studentForm = new FormGroup<IStudentForm>({
    Id: new FormControl(),
    People: new FormControl(null),
    Expedient: new FormControl(''),
    Course: new FormControl(null)
  });

  buttonDisabled = false;
  loading = false;

  people: IPerson[] = [];
  courses: ICourse[] = [];

  constructor(private matDialogRef: MatDialogRef<StudentDialogComponent>,
              private peopleService: PeopleService,
              private couseService: CourseService,
              @Inject(MAT_DIALOG_DATA) private editingStudent?: [IStudent, boolean]){

    if(editingStudent){
      this.studentForm.patchValue(editingStudent[0]);

      if(editingStudent[1]){
        this.studentForm.disable();
        this.buttonDisabled = true;
      }
    }
  }
  ngOnInit(): void {
    this.loading = true;
    forkJoin(
      [
        this.peopleService.getPeople(),
        this.couseService.getCourses()
      ]
    ).subscribe({
      next:(value) => {
        
        this.people = value[0];
        this.courses = value[1];
      },
      complete:() => {
        this.loading = false;
      }
    });
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
