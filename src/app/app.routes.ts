import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { EmployeesListComponent } from './features/employees/employees-list/employees-list.component';
import { ShiftAssignmentComponent } from './features/employees/shift-assignment/shift-assignment.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'empleados',
    component: EmployeesListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'asignar-turno/:id',
    component: ShiftAssignmentComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/empleados',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/empleados'
  }
];
