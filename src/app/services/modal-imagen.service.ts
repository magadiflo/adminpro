import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

type Tipo = 'usuarios' | 'medicos' | 'hospitales';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  baseUrl: string = environment.baseUrl;
  tipo!: Tipo;
  id!: string;
  img!: string;

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  constructor() { }

  abrirModal(tipo: Tipo, id: string, img: string = 'no-image'): void {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if(img.includes('https')){
      this.img = img;
    } else {
      this.img = `${this.baseUrl}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal(): void {
    this._ocultarModal = true;
  }
  
}
