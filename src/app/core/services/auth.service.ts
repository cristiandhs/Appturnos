import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse, LoginRequest } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private readonly TOKEN_KEY = 'auth_token';
  private readonly VALID_EMAIL = 'admin@test.com';
  private readonly VALID_PASSWORD = '123456';

  constructor() {
    // Initialize authentication state only on browser platform
    if (isPlatformBrowser(this.platformId)) {
      this.isAuthenticatedSubject.next(this.hasToken());
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      // Simulate authentication
      if (credentials.email === this.VALID_EMAIL && credentials.password === this.VALID_PASSWORD) {
        const token = 'token_' + Date.now();
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.TOKEN_KEY, token);
        }
        this.isAuthenticatedSubject.next(true);
        observer.next({ token, email: credentials.email });
        observer.complete();
      } else {
        observer.error({ message: 'Email o contraseña inválidos' });
      }
    });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.TOKEN_KEY);
    }
    return false;
  }
}
