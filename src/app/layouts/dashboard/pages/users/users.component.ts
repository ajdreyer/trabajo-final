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
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'name', 'actions'];

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
              this.userService.updateUser(editingUser.id.toString(), result).subscribe({
                next: () => {
                  this.userService.getUsers().subscribe({
                    next:(users) => {
                      this.users = users;
                    }
                  });
                }
              });

              Swal.fire({
                title: `El usuario se modificó de manera existosa.`,
                icon: "success"
              });
            }
            else{
              
              this.userService.createUser(result).subscribe({
                next: (createdUser) => {
                  this.users = [...this.users, createdUser];
                }
              });

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
      text: "El usuario se eliminará de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.userService.deleteUser(id.toString()).subscribe({
          next: () => 
            this.userService.getUsers().subscribe({
              next:(users) => {
                this.users = users;
              }
            })
        });
      }
    })
  }
}