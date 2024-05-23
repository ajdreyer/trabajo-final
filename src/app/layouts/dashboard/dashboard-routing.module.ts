import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
   /**
   * Path actual: /darshboard
   */
  {
    path: 'users',
    data: {
      title: 'Usuarios',
    },
    canActivate:[adminGuard],
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'students',
    data: {
      title: 'Estudiantes',
    },
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'courses',
    data: {
      title: 'Cursos',
    },
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },  
  {
    path: 'people',
    data: {
      title: 'Personas',
    },
    loadChildren: () =>
      import('./pages/people/people.module').then((m) => m.PeopleModule),
  },
  {
    path: 'registrations',
    data: {
      title: 'Inscripciones',
    },
    loadChildren: () =>
      import('./pages/registrations/registrations.module').then((m) => m.RegistrationsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'registrations',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
