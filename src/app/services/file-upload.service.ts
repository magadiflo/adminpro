import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

type Tipo = 'usuarios' | 'medicos' | 'doctores';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  baseUrl: string = environment.baseUrl;

  constructor() { }

  async actualizarFoto(archivo: File, tipo: Tipo, id: string) {
    try {
      const url = `${this.baseUrl}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      }).then(res => res.json());

      console.log(resp.msg);  
      return resp.ok ? resp.nombreArchivo : false;

    } catch (error) {
      console.log(error);
      return false;
    }
  }


}
