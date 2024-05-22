import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from './course.service';
import { ICourse } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectCourseError, selectCoursesList, selectLoadingCourses } from './store/course.selectors';
import { CourseActions } from './store/course.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];

  courses$:  Observable<ICourse[]>;

  loadingcourses$: Observable<boolean>;

  error$: Observable<unknown>;

  constructor(private courseService: CourseService,
              private dialog: MatDialog,
              private store: Store){
      this.loadingcourses$ = this.store.select(selectLoadingCourses);
      this.error$ = this.store.select(selectCourseError).pipe(map((err) => err as Error));
      this.courses$ = this.store.select(selectCoursesList);
              }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(){
    this.store.dispatch(CourseActions.loadCourses());

    this.store.select(selectCoursesList);
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
              this.store.dispatch(CourseActions.updateCourses({ id: editingCourse.id, payload: result}))

              Swal.fire({
                title: `El curso se modificó de manera existosa.`,
                icon: "success"
              });
            }
            else{
              this.store.dispatch(CourseActions.createCourses({payload: result}))

               Swal.fire({
                title: "Curso creado de manera exitosa.",
                icon: "success"
              });
            }

            this.loadCourses();
          }
        },
      });
  }

  onDeleteCourse(id:string):void{
    Swal.fire({
      title: "¿Está usted seguro que desea eliminar el curso?.",
      text: "El curso se eliminará de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.store.dispatch(CourseActions.deleteCoursesById({ id: id }));
  
        this.loadCourses();
      }
    })
  }
}
