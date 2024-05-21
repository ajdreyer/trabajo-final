import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
   /**
   * Path actual: /darshboard
   */
   {
    path: 'home',
    data: {
      title: 'Inicio',
    },
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'users',
    canActivate:[adminGuard],
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'classes',
    loadChildren: () =>
      import('./pages/classes/classes.module').then((m) => m.ClassesModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },  
  {
    path: 'people',
    loadChildren: () =>
      import('./pages/people/people.module').then((m) => m.PeopleModule),
  },
  {
    path: 'counter',
    loadChildren: () =>
      import('./pages/counter/counter.module').then((m) => m.CounterModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
