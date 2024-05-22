import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ICourse, ICourseForm } from '../../models';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss'
})
export class CourseDialogComponent {
  courseForm = new FormGroup<ICourseForm>({
    name: new FormControl('')
  });

  buttonDisabled = false;
  loading = false;

  constructor(private matDialogRef: MatDialogRef<CourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private editingCourse?: [ICourse, boolean]){

    if(editingCourse){
      this.courseForm.patchValue(editingCourse[0]);

      if(editingCourse[1]){
        this.courseForm.disable();
        this.buttonDisabled = true;
      }
    }
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
    return this.courseForm.get('name');
  }
}
