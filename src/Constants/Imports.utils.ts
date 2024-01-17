import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginModule } from '../app/login/login.component.module';
import { NavbarModule } from '../app/navbar/navbar.component.module';
import { EmployeeListModule } from '../app/employee-list/employee-list.module';
import { AddEmployeeModule } from '../app/add-empployee/add-empployee.module';
import { EmployeeDetailModule } from '../app/employee-detail/employee-detail.module';

import { FetchInterceptor } from '../app/Utils/fetch-interceptor'

const imports = [CommonModule, RouterOutlet,
  NavbarModule, HttpClientModule, ReactiveFormsModule,
  FormsModule, LoginModule, EmployeeListModule, AddEmployeeModule, EmployeeDetailModule];

const providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: FetchInterceptor,
    multi: true,
  }
];

export {
  imports,
  providers
};