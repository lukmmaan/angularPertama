import Swal from 'sweetalert2';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { API_URL } from '../../Constants/Api';
import { AuthService } from '../Utils/auth.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(LOCAL_STORAGE) private storageService: StorageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Login gagal!',
        text: 'Lengkapi Username sama Passwordnya !',
      });
      return;
    }

    this.loading = true;

    try {
      const formData = this.loginForm.value;
      const response: any = await this.http.post(`${API_URL}/login`, formData).toPromise();

      // this.storageService.set('token', response.token);
      this.storageService.set('fullName', response.fullName);
      this.storageService.set('email', response.email);
      this.storageService.set('role', response.role);

      this.authService.updateFullName(response.fullName);

      this.loginForm.reset();
      this.router.navigate(['/employees']);

      Swal.fire({
        icon: 'success',
        title: 'Login berhasil!',
        text: 'Mantap.',
      });
      console.log(response);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login gagal!',
        text: 'Coba lagi ea.',
      });

      console.error('Login failed:', error);
    } finally {
      this.loading = false;
    }
  }
}
