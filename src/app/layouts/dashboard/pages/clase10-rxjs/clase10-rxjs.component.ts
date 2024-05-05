import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, delay, forkJoin, of, take, takeUntil } from 'rxjs';
import { IUser } from '../users/models';
import { __values } from 'tslib';

@Component({
  selector: 'app-clase10-rxjs',
  templateUrl: './clase10-rxjs.component.html',
  styleUrl: './clase10-rxjs.component.scss'
})
export class Clase10RxjsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('el componente de destruyo');
    this.componenteDestruido$.next(true);
    this.obtenerUsuarioSubscription$?.unsubscribe();
  }
  
  cambioElUsuario$ = new Subject<boolean>();
  usuarioAutenticado$ = new BehaviorSubject<IUser | null>(null);

  obtenerUsuarioSubscription$? : Subscription;

  componenteDestruido$ = new Subject<boolean>();

  usuarios: IUser[] = [];
  roles: string[] = [];
  cargando = false;

  getUsers(): Observable<IUser[]>{
    
    const USERS_DB: IUser[] = [
    ];

    //this.cargando = true;

    return of(USERS_DB).pipe(delay(3500));
    // .subscribe({
    //   next: (value) => {
    //     this.usuarios = value;
    //   },
    //   complete:() => {
    //     this.cargando = false;
    //   }
    // });
  }

  getRoles(): Observable<string[]>{
    
    const ROLES_DB: string[] = [
      'USER',
      "ADMIN"
    ];

    //this.cargando = true;
    return of(ROLES_DB).pipe(delay(1500));
    // .subscribe({
    //   next: (value) => {
    //     this.roles = value;
    //   },
    //   complete:() => {
    //     this.cargando = false;
    //   }
    // });
  }

  iniciarSesion():void{
    this.cambioElUsuario$.next(true);
  }
  
  ngOnInit(): void {
    
    this.cargando = true;
    forkJoin(
      [
        this.getUsers(),
        this.getRoles()
      ]
    ).subscribe({
      next:(value) => {
        
        this.usuarios = value[0];
        this.roles = value[1];
      },
      complete:() => {
        this.cargando = false;
      }
    });
    // const obtenerUsuario$ = new Observable<number>((observer) => {
    //   let counter = 0;
    //   setInterval(() => {
    //     counter++;
    //     observer.next(counter);
    //   },1000);      
    // });

    // const cambioElUsuario$ = new Subject<boolean>();

    // cambioElUsuario$.next()

    // this.cambioElUsuario$.subscribe({
    //   next: (value) => {
    //     console.log(value);
    //     this.usuarioAutenticado$.next({
    //       id: 1,
    //       createdAt: new Date(),
    //       email: 'email@email.com',
    //       firstName : 'rogelio',
    //       lastName : 'buendia',
    //       bornDate : new Date(),
    //       role : 'USER'
    //     });
    //   },
    // });

    // this.usuarioAutenticado$.subscribe({
    //   next: (value) => {
    //     console.log(value);
    //   }
    // }); 

    // this.obtenerUsuarioSubscription$ = obtenerUsuario$.subscribe({
    //   next: (value) => {
    //       console.log(value);
    //   },
    //   error: () => {},
    //   complete: () => {
    //     console.log('el observable se completo por lo tanto no emite mas valores.');
    //   }
    // });
  }

  

}
