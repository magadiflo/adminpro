import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, catchError, of, tap, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { RegisterForm, AuthResponse, ListaUsuarios } from '../interfaces/register-form.interface';
import { LoginForm, LoginResponse, UsuarioResponse } from '../interfaces/login-form.interface';
import { Menu } from '../interfaces/menu.interface';

import { Usuario } from '../models/usuario.model';

import { Rol } from '../interfaces/rol.interface';



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

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): Rol {
    return this.usuario.role!;
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  guardarLocalStorage(token: string, menu: Menu[]) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/usuarios`, formData)
      .pipe(
        tap(({ ok, token, menu }) => {
          if (ok) {
            this.guardarLocalStorage(token!, menu!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {
    data = { ...data, role: this.usuario.role! };
    return this.http.put<AuthResponse>(`${this.baseUrl}/usuarios/${this.uid}`, data, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  validarToken(): Observable<boolean> {
    return this.http.get<LoginResponse>(`${this.baseUrl}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    })
      .pipe(
        map(resp => {
          if (resp.ok) {
            const { email, google, nombre, role, img, uid } = (resp.usuario as UsuarioResponse);
            this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
            this.guardarLocalStorage(resp.token, resp.menu!);
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
            this.guardarLocalStorage(resp.token, resp.menu!);
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
            this.guardarLocalStorage(resp.token, resp.menu!);
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
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => { //Cuando son librer??as externas, en este caso es el de google y no Angular
        this.router.navigateByUrl('/login');
      });
    });

    this.router.navigateByUrl('/login');
    console.log('Finalizando sesi??n...');  
  }

  cargarUsuarios(desde: number = 0): Observable<ListaUsuarios> {
    return this.http.get<ListaUsuarios>(`${this.baseUrl}/usuarios?desde=${desde}`, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(u => new Usuario(u.nombre, u.email, '', u.img, u.google, u.role, u.uid));
          return {
            ok: resp.ok,
            total: resp.total,
            usuarios
          }
        })
      );
  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete(`${this.baseUrl}/usuarios/${usuario.uid}`, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${this.baseUrl}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}
