import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AddEmployeeComponent } from './add-empployee.component';

@NgModule({
  declarations: [AddEmployeeComponent],
  imports: [FormsModule, CommonModule],
  exports: [AddEmployeeComponent],
})
export class AddEmployeeModule { }
