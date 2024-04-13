import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'fullName', 'email', 'createdAt', 'bornDate', 'actions'];

  students: IStudent[] =[];

  constructor(private studentService: StudentService,
              private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
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
              this.students = [...this.studentService.editStudent(editingStudent)];

              Swal.fire({
                title: `El estudiante ${editingStudent.firstName} ${editingStudent.lastName} se modificó de manera existosa.`,
                icon: "success"
              });
            }
            else{
              result.id = this.studentService.getNextId();
              result.createdAt = new Date();
              this.students = [...this.studentService.addStudent(result)];

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
      title: "¿Está usted seguro que desea eliminar el usuario?.",
      text: "El usuario se eliminara de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.students = [...this.studentService.deleteStudent(id)];
      }
    })
  }
}
