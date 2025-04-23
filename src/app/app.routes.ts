import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsListComponent } from './pages/students/student-list/students-list.component';
import { BatchListComponent } from './pages/batch/batch-list/batch-list.component';
import { StudentDetailsComponent } from './pages/students/student-details/student-details.component';
import { EnrollmentsComponent } from './pages/enrollments/enrollments.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'student',
        component: StudentsListComponent,
      },
      {
        path: 'student-detail',
        component: StudentDetailsComponent,
      },
      {
        path: 'batch/:batchid',
        component: BatchListComponent,
      },
      {
        path: 'enrollments/:batchid',
        component: EnrollmentsComponent,
      },
    ],
  },

  {
    path: '**',
    component: LoginComponent,
  },
];
