import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { StudentService } from './student.service';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import Swal from 'sweetalert2';
import { IPerson } from '../people/models';
import { ICourse } from '../courses/models';
import { PeopleService } from '../people/people.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'fullName', 'email', 'expedient', 'actions'];

  students:  IStudent[] =[];

  loading = false;

  @Input()
  visible = false;

  @Output()
  visibleChange = new EventEmitter();

  constructor(private studentService: StudentService,
              private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents():void{
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next:(students) => {
        this.students = students;
      },
      complete: () =>{
        this.loading = false;
      }
    })
  }

  opentDialog(editingStudent?: IStudent, readingMode?:boolean):void{
    this.dialog
      .open(StudentDialogComponent, {
        data: [editingStudent, readingMode],
      })
      .afterClosed()
      .subscribe({
        next:(result) => {
          if(result){
            if(editingStudent){
              this.studentService.editStudent(editingStudent.id, editingStudent).subscribe({
                next: (students) => {
                  this.students = [...students];
                }
              });

              Swal.fire({
                title: `El estudiante se modificó de manera existosa.`,
                icon: "success"
              });
            }
            else{
              this.studentService.getNextId().subscribe({
                next: (nextId) => {
                  result.id = nextId;
                }
              });

              result.createdAt = new Date();
              this.studentService.addStudent(result).subscribe({
                next: (students) => {
                  this.students = [...students];
                }
              });

               Swal.fire({
                title: "estudiante creado de manera exitosa.",
                icon: "success"
              });
            }
          }
        },
      });
  }

  onDeleteStudent(id:number):void{
    Swal.fire({
      title: "¿Está usted seguro que desea eliminar el estudiante?.",
      text: "El estudiante se eliminará de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.studentService.deleteStudent(id).subscribe({
          next: (students) => {
            this.students = [...students];
          }
        });
      }
    })
  }
}
