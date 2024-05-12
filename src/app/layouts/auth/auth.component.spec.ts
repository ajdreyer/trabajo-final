import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { IUser } from '../dashboard/pages/users/models';
import { Observable, of, subscribeOn } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;

  const mockRespLogin: IUser[] = [
    {
      id: 1,
      person: {
      id: 1,
      firstName: "Alejandro",
      lastName: "Dreyer",
      email: "alejandro.dreyer91@gmail.com",
      createdAt: new Date(),
      bornDate: new Date("1991-01-04"),
      idNumber: 28456123,
      schoolLevel: "Secondary",
      streetName: "Callao",
      streetNumber: "973",
      floor: 2,
      department: "B"
    },
    role: {
      id: 1,
      name: "admin"
    },
    name: "adreyer",
    password: "ale123"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [SharedModule, BrowserAnimationsModule, HttpClientModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('El campo email debe ser requerido', () => {
    const control = component.loginForm.get('email');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('El campo password debe ser requerido', () => {
    const control = component.loginForm.get('password');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('Debe llamar markAllAsTouched de loginForm al llamar login, si el formulario es invalido', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });
    expect(component.loginForm.invalid).toBeTrue();
    const spyOnMarkAllAsTouched = spyOn(
      component.loginForm,
      'markAllAsTouched'
    );
    component.login();
    expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
  });

  it('Debe llamar a authService.login si el formulario es valido al llamar login', () => {
    component.loginForm.setValue({
      email: 'email@mail.com',
      password: '123456',
    });
    expect(component.loginForm.valid).toBeTrue();
    const spyOnLogin = spyOn(authService, 'login').and.returnValue(of(mockRespLogin));

    component.login();
    expect(spyOnLogin).toHaveBeenCalled();
  });
});
