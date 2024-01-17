import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

import { EmployeeListComponent } from './employee-list.component';

@NgModule({
  declarations: [EmployeeListComponent],
  imports: [CommonModule, MatPaginatorModule, FormsModule],
  exports: [EmployeeListComponent],
  providers: [
    { provide: MatPaginatorIntl }
  ],
})
export class EmployeeListModule { }
