import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from './models';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectAuthError } from './store/auth.selectors';
import { AuthActions } from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  loginForm: FormGroup;

  loginError$:Observable<unknown>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    this.loginError$ = this.store.select(selectAuthError).pipe(map((err) => err as Error));
  }

  login(){
    if(this.loginForm.valid){
      this.store.dispatch(AuthActions.loginAuths({ payload: this.loginForm.value}))

      this.router.navigate(['dashboard', 'home']);
      this.loginForm.reset();
    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }
}
