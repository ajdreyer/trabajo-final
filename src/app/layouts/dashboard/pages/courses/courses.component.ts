import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from './course.service';
import { ICourse } from './models';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];

  courses: ICourse[] = [];
  
  @Input()
  visible = false;

  @Output()
  visibleChange = new EventEmitter();

  constructor(private courseService: CourseService){}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      }
    });
  }

}
