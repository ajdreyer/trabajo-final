import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IRegistration } from './models';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectLoadingRegistrations, selectRegistrationError, selectRegistrationsList } from './store/registration.selectors';
import { RegistrationActions } from './store/registration.actions';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.scss'
})
export class RegistrationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'turn', 'subject', 'hourFrom', 'hourTo', 'actions'];

  registrations$:  Observable<IRegistration[]>;

  loadingRegistrations$: Observable<boolean>;

  error$: Observable<unknown>;

  constructor(private dialog: MatDialog,
              private store: Store){
      this.loadingRegistrations$ = this.store.select(selectLoadingRegistrations);
      this.error$ = this.store.select(selectRegistrationError).pipe(map((err) => err as Error));
      this.registrations$ = this.store.select(selectRegistrationsList);
    }
    
    ngOnInit(): void {
      this.loadRegistrations();
    }

    loadRegistrations(){
      this.store.dispatch(RegistrationActions.loadRegistrations());

      this.store.select(selectRegistrationsList);
    }

    opentDialog(editingRegistration?: IRegistration, readingMode?:boolean):void{
      this.dialog
        .open(RegistrationDialogComponent, {
          data: [editingRegistration, readingMode],
        })
        .afterClosed()
        .subscribe({
          next:(result) => {
            if(result){
              if(editingRegistration){
                this.store.dispatch(RegistrationActions.updateRegistrations({ id: editingRegistration.id, payload: result}))
  
                Swal.fire({
                  title: `La inscripcion se modificó de manera existosa.`,
                  icon: "success"
                });
              }
              else{
                this.store.dispatch(RegistrationActions.createRegistrations({payload: result}))
  
                 Swal.fire({
                  title: "Inscripcion creada de manera exitosa.",
                  icon: "success"
                });
              }
  
              this.loadRegistrations();
            }
          },
        });
    }

    onDeleteRegistration(id:string):void{
      Swal.fire({
        title: "¿Está usted seguro que desea eliminar la inscripción?.",
        text: "La inscripción se eliminará de forma permanente.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar."
      }).then((result) => {
        if(result.isConfirmed){
          this.store.dispatch(RegistrationActions.deleteRegistrationsById({ id: id }));
  
          this.loadRegistrations();
        }
      })
    }
}
