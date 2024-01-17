import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fullNameSubject = new Subject<string | null>();
  fullName$ = this.fullNameSubject.asObservable();

  updateFullName(fullName: string) {
    this.fullNameSubject.next(fullName);
  }
}
