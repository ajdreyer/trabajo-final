import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clase-09-rxjs',
  templateUrl: './clase-09-rxjs.component.html',
  styleUrl: './clase-09-rxjs.component.scss'
})
export class Clase09RxjsComponent {
  constructor(){
    //this.obtenerResultado();
    this.runRelog();
  }

  runRelog(){
    const obs = new Observable((observer) => {
      //observer.error('error al obtener la fecha');

      let counter = 5;
      setInterval(() => {
        counter--;
        if(counter === 0)
          observer.complete();
        observer.next(new Date());
      }, 1000);
    });

    obs.subscribe({
      next: (resultado) => {
        console.log(resultado);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('El reloj dejo de emitir valores.')
      }
    });
  }

  async obtenerResultado(){
    console.log('inicio');

    const meDevolveraElDinero = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });

    await meDevolveraElDinero.then((resultado) => {
      console.log(resultado);
    });

    console.log('final');
  }
}
