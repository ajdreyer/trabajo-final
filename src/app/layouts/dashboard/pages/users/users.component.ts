import {Component} from '@angular/core';
import { IUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'actions'];

  users: IUser[] = [
    {
      id: 1,
      firstName: "Alejandro",
      lastName: "Dreyer",
      email: "email@email.com",
      role: 'ADMIN',
      createdAt: new Date(),
    },
    {
      id: 2,
      firstName: "Roberto",
      lastName: "Perfumo",
      email: "email@email.com",
      role: 'USER',
      createdAt: new Date(),
    },
    {
      id: 3,
      firstName: "Patricio",
      lastName: "Toranzo",
      email: "email@email.com",
      role: 'USER',
      createdAt: new Date(),
    },
    {
      id: 4,
      firstName: "Esteban",
      lastName: "Fuertes",
      email: "email@email.com",
      role: 'USER',
      createdAt: new Date(),
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
            }
            else{
              result.id = new Date().getTime();
              result.createdAt = new Date();
              this.users = [...this.users, result];
            }
          }
        },
      });
  }

  onDeleteUser(id:number):void{
    //sweet alert con confirmacion de eliminacion
    this.users = this.users.filter((u) => u.id != id);
  }


}