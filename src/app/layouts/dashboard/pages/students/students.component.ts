import { Component, OnInit} from '@angular/core';
import { StudentService } from './student.service';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { selectLoadingStudents, selectStudentError, selectStudentsList } from './store/student.selectors';
import { StudentActions } from './store/student.actions';
import { Observable, map} from 'rxjs';
import { selectAuthUser } from '../../../auth/store/auth.selectors';
import { IUser } from '../users/models';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'fullName', 'email', 'expedient', 'actions'];

  students$:  Observable<IStudent[]>;

  loadingStudents$: Observable<boolean>;

  error$: Observable<unknown>;

  authUser$: Observable<IUser[] | null>

  constructor(private dialog: MatDialog,
              private store: Store){
                this.loadingStudents$ = this.store.select(selectLoadingStudents);
                this.error$ = this.store.select(selectStudentError).pipe(map((err) => err as Error));
                this.students$ = this.store.select(selectStudentsList);
                this.authUser$ = this.store.select(selectAuthUser);
              }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents():void{
    this.store.dispatch(StudentActions.loadStudents());

    this.store.select(selectStudentsList);
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
              this.store.dispatch(StudentActions.updateStudent({ id: editingStudent.id, payload: result}))

              Swal.fire({
                title: `El estudiante se modificó de manera existosa.`,
                icon: "success"
              });
            }
            else{
              this.store.dispatch(StudentActions.createStudent({payload: result}))

               Swal.fire({
                title: "Estudiante creado de manera exitosa.",
                icon: "success"
              });
            }

            this.loadStudents();
          }
        },
      });
  }

  onDeleteStudent(id:string):void{
    Swal.fire({
      title: "¿Está usted seguro que desea eliminar el estudiante?.",
      text: "El estudiante se eliminará de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.store.dispatch(StudentActions.deleteStudentById({ id: id }));

        this.loadStudents();
      }
    })
  }
}
