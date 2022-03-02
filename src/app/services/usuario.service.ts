import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { RegisterForm, AuthResponse } from '../interfaces/register-form.interface';
import { LoginForm, LoginResponse } from '../interfaces/login-form.interface';
import { map, catchError, of, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/usuarios`, formData)
      .pipe(
        tap(({ok, token}) => {
          if(ok){
            localStorage.setItem('token', token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get<LoginResponse>(`${this.baseUrl}/login/renew`, { 
      headers: {
        'x-token': token
      }
    })
    .pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token);
        }
      }),
      map(resp => resp.ok), //true
      catchError(err => of(err.ok))//false
    );
  }

  login(formData: LoginForm) {
    (formData.remember) ? localStorage.setItem('email', formData.email) : localStorage.removeItem('email');
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, formData)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  loginGoogle(token: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login/google`, { token })
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }
}
