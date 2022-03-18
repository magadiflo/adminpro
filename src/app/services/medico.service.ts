import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private baseUrl: string = environment.baseUrl;

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

  cargarMedicos(): Observable<Medico[]> {
    return this.http.get<{ ok: boolean, medicos: Medico[] }>(`${this.baseUrl}/medicos`, this.headers)
      .pipe(
        map(resp => resp.medicos)
      );
  }

  crearMedico(medico: { nombre: string, hospital: string }) {
    return this.http.post<{ ok: boolean, medico: Medico }>(`${this.baseUrl}/medicos`, medico, this.headers);
  }

  actualizarMedico(medico: Medico) {
    return this.http.put(`${this.baseUrl}/medicos/${medico._id}`, medico, this.headers);
  }

  borrarMedico(_id: string) {
    return this.http.delete(`${this.baseUrl}/medicos/${_id}`, this.headers);
  }

}
