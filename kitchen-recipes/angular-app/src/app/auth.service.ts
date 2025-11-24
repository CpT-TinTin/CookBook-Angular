import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private users: User[] = [
    { email: 'user@test.com', password: 'password', name: 'Demo User' }
  ];

  private currentUser: User | null = null;

  constructor() { }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  register(user: User): boolean {
    if (this.users.some(u => u.email === user.email)) {
      return false; // User already exists
    }
    this.users.push(user);
    this.currentUser = user;
    this.isLoggedInSubject.next(true);
    return true;
  }

  logout(): void {
    this.currentUser = null;
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
