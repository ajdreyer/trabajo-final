import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  showStudents = false;
  showClasses = false;
  showCourses = false;

  isMobile(): boolean {
    return window.innerWidth <= 280;
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
