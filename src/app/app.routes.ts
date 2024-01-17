import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-empployee/add-empployee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

import { AuthGuard } from './Utils/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees',
    component: EmployeeListComponent
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent
  },
  {
    path: 'employee-detail/:id',
    component: EmployeeDetailComponent
  },
  {
    path: '**',
    redirectTo: '/employees',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export { routes };
