import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

import { Usuario } from '../models/usuario.model';

type Tipo = 'usuarios' | 'medicos' | 'hospitales';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  buscar(tipo: Tipo, termino: string) {
    return this.http.get<Usuario[]>(`${this.baseUrl}/todo/coleccion/${tipo}/${termino}`, this.headers)
      .pipe(
        map((resp: any) => {
          const usuarios = (<Usuario[]>resp.resultados).map(u => new Usuario(u.nombre, u.email, '', u.img, u.google, u.role, u.uid));
          return usuarios;
        })
      );
  }

}
