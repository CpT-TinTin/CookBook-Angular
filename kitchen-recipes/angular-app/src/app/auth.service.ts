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

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.isLoggedInSubject.next(true);
    }
  }

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private saveSession(): void {
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      this.isLoggedInSubject.next(true);
      this.saveSession();
      return true;
    }
    return false;
  }

  register(user: User): boolean {
    if (this.users.some(u => u.email === user.email)) {
      return false; // User already exists
    }
    this.users.push(user);
    this.saveUsers(); // Save to local storage

    this.currentUser = user;
    this.isLoggedInSubject.next(true);
    this.saveSession();
    return true;
  }

  logout(): void {
    this.currentUser = null;
    this.isLoggedInSubject.next(false);
    this.saveSession();
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
