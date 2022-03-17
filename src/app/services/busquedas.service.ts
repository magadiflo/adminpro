import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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

  private transformarUsuarios(resultados: Usuario[]): Usuario[] {
    return resultados.map(u => new Usuario(u.nombre, u.email, '', u.img, u.google, u.role, u.uid));
  }

  buscar(tipo: Tipo, termino: string): Observable<Usuario[] | Hospital[] | Medico[]> {
    return this.http.get<any[]>(`${this.baseUrl}/todo/coleccion/${tipo}/${termino}`, this.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(<Usuario[]>resp.resultados);
            case 'medicos':
              return (resp.resultados as Medico[]); //Otra forma de castear al tipo Medico[]
            case 'hospitales':
              return <Hospital[]>resp.resultados; //Casteando resultados al tipo Hospital[]
            default:
              return [];
          }
        })
      );
  }

}
