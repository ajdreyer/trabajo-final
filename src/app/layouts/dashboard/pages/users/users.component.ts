import {Component, OnInit} from '@angular/core';
import { IUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';
import { UsersService } from './users.service';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectLoadingUsers, selectUsersError, selectUsersList } from './store/user.selectors';
import { selectAuthUser } from '../../../auth/store/auth.selectors';
import { UserActions } from './store/user.actions';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'name', 'actions'];

  users$: Observable<IUser[]>;

  loading$:Observable<boolean>;

  authUser$: Observable<IUser[] | null>

  error$: Observable<unknown>;

  constructor(private dialog: MatDialog, 
              private userService: UsersService,
              private store: Store){
    this.loading$ = this.store.select(selectLoadingUsers);
    this.error$ = this.store.select(selectUsersError).pipe(map((err) => err as Error));
    this.users$ = this.store.select(selectUsersList);
    this.authUser$ = this.store.select(selectAuthUser);
  }
  
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers():void{
    this.store.dispatch(UserActions.loadUsers());

    this.store.select(selectUsersList);
  }

  opentDialog(editingUser?: IUser, readingMode?:boolean):void{
    this.dialog
      .open(UserDialogComponent, {
        data: [editingUser, readingMode]
      })
      .afterClosed()
      .subscribe({
        next:(result) => {
          if(result){
            if(editingUser){
              this.store.dispatch(UserActions.updateUsers({ id: editingUser.id, payload: result}))

              Swal.fire({
                title: `El usuario se modificó de manera existosa.`,
                icon: "success"
              });
            }
            else{
              this.store.dispatch(UserActions.createUsers({payload: result}))

               Swal.fire({
                title: "Usuario creado de manera exitosa.",
                icon: "success"
              });
            }

            this.loadUsers();
          }
        },
      });
  }

  onDeleteUser(id:string):void{
    Swal.fire({
      title: "¿Está usted seguro que desea eliminar el usuario?.",
      text: "El usuario se eliminará de forma permanente.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if(result.isConfirmed){
        this.store.dispatch(UserActions.deleteUsersById({ id: id }));

        this.loadUsers();
      }
    })
  }
}