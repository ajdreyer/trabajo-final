import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Clase09RxjsRoutingModule } from './clase-09-rxjs-routing.module';
import { Clase09RxjsComponent } from './clase-09-rxjs.component';


@NgModule({
  declarations: [
    Clase09RxjsComponent
  ],
  imports: [
    CommonModule,
    Clase09RxjsRoutingModule
  ],
  exports:[
    Clase09RxjsComponent
  ]
})
export class Clase09RxjsModule { }
