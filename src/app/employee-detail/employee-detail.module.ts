import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { EmployeeDetailComponent } from './employee-detail.component';

@NgModule({
  declarations: [EmployeeDetailComponent],
  imports: [DatePipe, CurrencyPipe, CommonModule],
  exports: [EmployeeDetailComponent],
})
export class EmployeeDetailModule { }
