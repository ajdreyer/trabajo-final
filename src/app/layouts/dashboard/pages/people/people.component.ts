import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPerson } from './models';
import { MatDialog } from '@angular/material/dialog';
import { PeopleService } from './people.service';
import { PeopleDialogComponent } from './components/people-dialog/people-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'createdAt', 'bornDate', 'actions'];

  people:  IPerson[] =[];

  loading = false;

  constructor(private peopleService: PeopleService,
              private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople():void{
    this.loading = true;
    this.peopleService.getPeople().subscribe({
      next:(people) => {
        this.people = people;
      },
      complete: () =>{
        this.loading = false;
      }
    })
  }

  opentDialog(editingPerson?: IPerson, readingMode?:boolean):void{
    this.dialog
      .open(PeopleDialogComponent, {
        data: [editingPerson, readingMode],
      })
      .afterClosed()
      .subscribe({
        next:(result) => {
          if(result){
            if(editingPerson){
              this.peopleService.updatePeople(editingPerson.id.toString(), result).subscribe({
                next: () => {
                  this.peopleService.getPeople().subscribe({
                    next:(people) => {
                      this.people = people;
                    }
                  });
                }
              });

              Swal.fire({
                title: `La persona se modificó de manera existosa.`,
                icon: "success"
              });
            }
            else{
              result.createdAt = new Date();
              this.peopleService.addPeople(result).subscribe({
                next: (createdPeople) => {
                  this.people = [...this.people, createdPeople];
                }
              });

               Swal.fire({
                title: "Persona creada de manera exitosa.",
                icon: "success"
              });
            }
          }
        },
      });
  }

  onDeletePeople(id:number):void{
    Swal.fire({
      title: "¿Está usted seguro que desea eliminar la persona?.",
      text: "La persona se eliminará de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.peopleService.deletePeople(id.toString()).subscribe({
          next: () => 
            this.peopleService.getPeople().subscribe({
              next:(people) => {
                this.people = people;
              }
            })
        });
      }
    })
  }
}
