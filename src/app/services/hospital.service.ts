import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Hospital } from '../models/hospital.model';
import { ListaHospitales } from '../interfaces/hospital.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales(): Observable<Hospital[]> {
    return this.http.get<ListaHospitales>(`${this.baseUrl}/hospitales`, this.headers)
      .pipe(
        map(resp => resp.hospitales)
      );
  }

  crearHospital(nombre: string) {
    return this.http.post(`${this.baseUrl}/hospitales`, { nombre }, this.headers);
  }

  actualizarHospital(_id: string, nombre: string) {
    return this.http.put(`${this.baseUrl}/hospitales/${_id}`, { nombre }, this.headers);
  }

  borrarHospital(_id: string) {
    return this.http.delete(`${this.baseUrl}/hospitales/${_id}`, this.headers);
  }
}
