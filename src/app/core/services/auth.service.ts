import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, of } from "rxjs";
import { IUser } from "../../layouts/dashboard/pages/users/models";
import { Router } from "@angular/router";
import { LoginData } from "../../layouts/auth/models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService
{
    private _authUser$ = new BehaviorSubject<IUser | null>(null);
    public authUser$ = this._authUser$.asObservable();
    
    private MOCK_AUTH_USER: IUser = {
      id: 1,
      person: {
        id: 1,
        firstName: "Alejandro",
        lastName: "Dreyer",
        email: "alejandro.dreyer91@gmail.com",
        createdAt: new Date('2024-05-03'),
        bornDate: new Date('1991-01-04'),
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
    };

    users: IUser[] = [];

    constructor(private router: Router) {}
    
    login(loginData: LoginData): void {
      if(loginData.name !== 'adreyer' && loginData.password !== 'ale123'){
        alert("datos incorrectos");
      }else{
        this._authUser$.next(this.MOCK_AUTH_USER);

        localStorage.setItem('accessToken', 'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfds');
          
        this.router.navigate(['dashboard', 'home']);
      }
    }    
    
    verifyToken(): boolean {
        const token = localStorage.getItem('accessToken');

        if (token) {
          this._authUser$.next(this.MOCK_AUTH_USER);
          return true;
              
        }else{
          return false;
        }
      }
    
      logout(): void {
        this._authUser$.next(null);
        localStorage.removeItem('accessToken');
      }
}