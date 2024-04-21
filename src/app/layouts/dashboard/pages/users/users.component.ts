import {Component, OnInit} from '@angular/core';
import { IUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'bornDate', 'createdAt', 'actions'];

  users: IUser[] = [];

  loading = false;

  constructor( private dialog: MatDialog, private userService: UsersService){
    
  }
  ngOnInit(): void {
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.log('error:', err);
        Swal.fire({
          title: err,
          icon: "error"
        });
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

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