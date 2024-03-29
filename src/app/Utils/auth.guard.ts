import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    if (typeof localStorage !== 'undefined') {
      const fullName = localStorage.getItem('fullName');

      if (fullName) {
        this.router.navigate(['/employees']);
        return false;
      }
    }

    return true;
  }
}
