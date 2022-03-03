import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, catchError, of, tap, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { RegisterForm, AuthResponse } from '../interfaces/register-form.interface';
import { LoginForm, LoginResponse, UsuarioResponse } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  private baseUrl = environment.baseUrl;
  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/usuarios`, formData)
      .pipe(
        tap(({ ok, token }) => {
          if (ok) {
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
        map(resp => {
          if (resp.ok) {
            const { email, google, nombre, role, img, uid } = (resp.usuario as UsuarioResponse);
            this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
            
            localStorage.setItem('token', resp.token);
          }
          return resp.ok; //true
        }),
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

  googleInit() {
    return new Promise<void>((resolve, reject) => {
      console.log('googleInit()');
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '70858709123-fcvm26auhk4us67vhrmj2ashsi2925ls.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        
        resolve();
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => { //Cuando son librerías externas, en este caso es el de google y no Angular
        this.router.navigateByUrl('/login');
      });
    });
  }
}
