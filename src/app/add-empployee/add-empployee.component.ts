import Swal from 'sweetalert2';

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { API_URL } from '../../Constants/Api';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-empployee.component.html',
  styleUrls: ['./add-empployee.component.css']
})
export class AddEmployeeComponent {
  employee = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: 'Active',
    group: '',
    description: ''
  };

  loading = false;

  constructor(private http: HttpClient, private router: Router) { }

  async onSubmit() {
    if (this.validateForm()) {

      try {
        this.loading = true;
        await this.http.post(`${API_URL}/addEmployee`, this.employee).toPromise();
        this.showSuccessAlert();
        this.router.navigate(['/employee-list']);
      } catch (error) {
        // console.log('Error', error);
        this.showErrorAlert();
      } finally {
        this.resetForm();
        this.loading = false;
      }
    } else {
      this.showValidationErrorAlert();
    }
  }

  private validateForm(): boolean {
    return (
      !!this.employee.username &&
      !!this.employee.firstName &&
      !!this.employee.lastName &&
      !!this.employee.email &&
      !!this.employee.birthDate &&
      this.employee.basicSalary > 0 &&
      !!this.employee.group &&
      !!this.employee.description
    );
  }

  private resetForm() {
    this.employee = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      basicSalary: 0,
      status: 'Active',
      group: '',
      description: ''
    };
  }

  private showSuccessAlert() {
    Swal.fire('Success', 'Employee sudah ditambahkan!', 'success');
  }

  private showErrorAlert() {
    Swal.fire('Error', 'Gagal, coba lagi nanti!', 'error');
  }

  private showValidationErrorAlert() {
    Swal.fire('Validation Error', 'Isi semua field.', 'warning');
  }
}
