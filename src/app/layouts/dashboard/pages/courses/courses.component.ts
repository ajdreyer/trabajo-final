import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from './course.service';
import { ICourse } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'class', 'actions'];

  courses: ICourse[] = [];

  constructor(private courseService: CourseService,
              private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      }
    });
  }

  opentDialog(editingCourse?: ICourse, readingMode?:boolean):void{
    this.dialog
      .open(CourseDialogComponent, {
        data: [editingCourse, readingMode],
      })
      .afterClosed()
      .subscribe({
        next:(result) => {
          if(result){
            if(editingCourse){
              this.courseService.editCourses(editingCourse.Id, result).subscribe({
                next: (courses) => {
                  this.courses = [...courses];
                }
              });

              Swal.fire({
                title: `El curso se modificó de manera existosa.`,
                icon: "success"
              });
            }
            else{
              this.courseService.getNextId().subscribe({
                next: (nextId) => {
                  result.Id = nextId;
                }
              });

              this.courseService.addCourses(result).subscribe({
                next: (courses) => {
                  this.courses = [...courses];
                }
              });

               Swal.fire({
                title: "Curso creado de manera exitosa.",
                icon: "success"
              });
            }
          }
        },
      });
  }

  onDeleteCourse(id:number):void{
    Swal.fire({
      title: "¿Está usted seguro que desea eliminar el curso?.",
      text: "El curso se eliminará de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.courseService.deleteCourses(id).subscribe({
          next: (courses) => {
            this.courses = [...courses];
          }
        });
      }
    })
  }
}
