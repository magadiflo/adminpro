import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm, LoginResponse } from '../interfaces/login-form.interface';
import { map, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${this.baseUrl}/usuarios`, formData);
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
