import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { restar, sumar } from '../../../../store/counter/counter.actions';
import { Observable } from 'rxjs';
import { counterState, counterValue } from '../../../../store/counter/counter.selector';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {

  value$:Observable<number>;

  constructor(private store: Store){
    this.value$ = this.store.select(counterValue)
  }

  sumar():void{
    this.store.dispatch(sumar());
  }

  restar():void{
    this.store.dispatch(restar());
  }
}
