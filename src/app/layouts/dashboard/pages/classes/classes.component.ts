import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IClass } from './models';
import { ClassService } from './class.service';
import { MatDialog } from '@angular/material/dialog';
import { ClassDialogComponent } from './components/class-dialog/class-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
  displayedColumns: string[] = ['id', 'turn', 'subject', 'hourFrom', 'hourTo', 'actions'];

  classes:  IClass[] =[];

  loading = false;

  constructor(private classService: ClassService,
              private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses():void{
    this.loading = true;
    this.classService.getClasses().subscribe({
      next:(classes) => {
        this.classes = classes;
      },
      complete: () =>{
        this.loading = false;
      }
    })
  }

  opentDialog(editingClass?: IClass, readingMode?:boolean):void{
    this.dialog
      .open(ClassDialogComponent, {
        data: [editingClass, readingMode],
      })
      .afterClosed()
      .subscribe({
        next:(result) => {
          if(result){
            if(editingClass){
              this.classService.editClass(editingClass.Id, result).subscribe({
                next: (classes) => {
                  this.classes = [...classes];
                }
              });

              Swal.fire({
                title: `La clase se modificó de manera existosa.`,
                icon: "success"
              });
            }
            else{
              this.classService.getNextId().subscribe({
                next: (nextId) => {
                  result.Id = nextId;
                }
              });

              this.classService.addClass(result).subscribe({
                next: (classes) => {
                  this.classes = [...classes];
                }
              });

               Swal.fire({
                title: "Clase creada de manera exitosa.",
                icon: "success"
              });
            }
          }
        },
      });
  }

  onDeleteClass(id:number):void{
    Swal.fire({
      title: "¿Está usted seguro que desea eliminar la clase?.",
      text: "La clase se eliminará de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.classService.deleteClass(id).subscribe({
          next: (classes) => {
            this.classes = [...classes];
          }
        });
      }
    })
  }
}
