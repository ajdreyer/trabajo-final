import { Component, Inject } from '@angular/core';
import { IClass } from '../../../classes/models';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { ClassService } from '../../../classes/class.service';
import { IStudentForm, IStudent } from '../../../students/models';
import { CourseService } from '../../course.service';
import { ICourse, ICourseForm } from '../../models';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss'
})
export class CourseDialogComponent {
  courseForm = new FormGroup<ICourseForm>({
    Id: new FormControl(),
    Class: new FormControl(null),
    Name: new FormControl('')
  });

  buttonDisabled = false;
  loading = false;

  classes: IClass[] = [];

  constructor(private matDialogRef: MatDialogRef<CourseDialogComponent>,
              private classesService: ClassService,
              @Inject(MAT_DIALOG_DATA) private editingCourset?: [ICourse, boolean]){

    if(editingCourset){
      this.courseForm.patchValue(editingCourset[0]);

      if(editingCourset[1]){
        this.courseForm.disable();
        this.buttonDisabled = true;
      }
    }
  }
  ngOnInit(): void {
    this.loading = true;
    this.classesService.getClasses().subscribe({
      next:(value) => {
        this.classes = value;
      },
      complete:() => {
        this.loading = false;
      }
    });
  }

  onSave():void{
    if(this.courseForm.invalid){
      this.courseForm.markAllAsTouched();

      Swal.fire({
        title: 'Se deben completar todos los campos requeridos.',
        icon: "error"
      });
    }
    else{
      this.matDialogRef.close(this.courseForm.value)
    }
  }

  get nameControl(){
    return this.courseForm.get('Name');
  }

  get classControl(){
    return this.courseForm.get('Class');
  }
}
