import Swal from 'sweetalert2';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

import { AuthService } from '../Utils/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public fullNameSubscription!: Subscription;

  fullName: string | null;

  constructor(
    @Inject(LOCAL_STORAGE) private storageService: StorageService,
    private authService: AuthService
  ) {
    this.fullName = this.storageService.get('fullName');
  }

  ngOnInit(): void {
    this.fullNameSubscription = this.authService.fullName$.subscribe((fullName) => {
      this.fullName = fullName;
    });
  }

  ngOnDestroy(): void {
    this.fullNameSubscription.unsubscribe();
  }

  logout() {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.performLogout();
      }
    });
  }

  performLogout() {
    this.storageService.remove('token');
    this.storageService.remove('fullName');
    this.storageService.remove('email');
    this.storageService.remove('role');
    window.location.href = '/login';
  }

}
