import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsComponent } from './pages/students/students.component';
import { BatchListComponent } from './pages/batch/batch-list/batch-list.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'admin',
        component: LayoutComponent,
        children: [
            {
                path:'dashboard',
                component: DashboardComponent
            },
            {
                path:'student',
                component: StudentsComponent
            }, 
            {
                path:'batch/:batchid',
                component: BatchListComponent
            }
        ]
    },
    {
        path:"**",
        component: LoginComponent
    }


];
