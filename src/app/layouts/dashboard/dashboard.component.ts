import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from './pages/users/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  mostrarComponente = true;

  showStudents = false;
  showClasses = false;
  showCourses = false;

  isMobile(): boolean {
    return window.innerWidth <= 280;
  }

  authUser$: Observable<IUser | null>;

  constructor(private authService: AuthService){
    this.authUser$ = this.authService.authUser$;
  }

  logout(): void{
    this.authService.logout();
  }

  displayStudents():void{
    this.showStudents = true;
    this.showCourses = false;
    this.showClasses = false;
  }

  displayClasses():void{
    this.showStudents = false;
    this.showCourses = false;
    this.showClasses = true;
  }

  displayCourses():void{
    this.showStudents = false;
    this.showCourses = true;
    this.showClasses = false;
  }
}
