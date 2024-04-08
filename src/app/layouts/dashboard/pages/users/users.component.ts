import {Component} from '@angular/core';
import { IUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'bornDate', 'createdAt', 'actions'];

  users: IUser[] = [
    {
      id: 1,
      firstName: "Alejandro",
      lastName: "Dreyer",
      email: "email@email.com",
      role: 'ADMIN',
      createdAt: new Date(),
      bornDate: new Date('04-01-1991')
    },
    {
      id: 2,
      firstName: "Roberto",
      lastName: "Perfumo",
      email: "email@email.com",
      role: 'USER',
      createdAt: new Date(),
      bornDate: new Date('05-02-1950')
    },
    {
      id: 3,
      firstName: "Patricio",
      lastName: "Toranzo",
      email: "email@email.com",
      role: 'USER',
      createdAt: new Date(),
      bornDate: new Date('04-01-1980')
    },
    {
      id: 4,
      firstName: "Esteban",
      lastName: "Fuertes",
      email: "email@email.com",
      role: 'USER',
      createdAt: new Date(),
      bornDate: new Date('08-17-1980')
    }
  ]

  constructor( private dialog: MatDialog){}

  opentDialog(editingUser?: IUser):void{
    this.dialog
      .open(UserDialogComponent, {
        data: editingUser
      })
      .afterClosed()
      .subscribe({
        next:(result) => {
          if(result){
            if(editingUser){
              this.users = this.users.map((m) => m.id === editingUser.id ? {...m, ...result} : m);

              Swal.fire({
                title: `El usuario ${editingUser.firstName} ${editingUser.lastName} se modificó de manera existosa.`,
                icon: "success"
              });
            }
            else{
              result.id = new Date().getTime();
              result.createdAt = new Date();
              this.users = [...this.users, result];

               Swal.fire({
                title: "Usuario creado de manera exitosa.",
                icon: "success"
              });
            }
          }
        },
      });
  }

  onDeleteUser(id:number):void{
    Swal.fire({
      title: "¿Está usted seguro que desea eliminar el usuario?.",
      text: "El usuario se eliminara de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.users = this.users.filter((u) => u.id != id);
      }
    })
  }
}