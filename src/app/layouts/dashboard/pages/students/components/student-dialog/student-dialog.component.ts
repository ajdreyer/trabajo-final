import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {
  studentForm: FormGroup;
  constructor(private formBuilder:FormBuilder){
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],// Validators.maxLength(6), Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?<!\s)$")]],
      lastName: ['', [Validators.required]],//, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?<!\s)$")]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}')]],
      bornDate:['', Validators.required],
      IdNumber: ['', Validators.required],
      schoolLevel: ['', Validators.required],
      streetName:['', Validators.required],
      streetNumber: ['', Validators.required],
      floor: [''],
      department:['']
    });
  }
}
