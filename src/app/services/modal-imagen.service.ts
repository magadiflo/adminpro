import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  constructor() { }

  abrirModal(): void {
    this._ocultarModal = false;
  }

  cerrarModal(): void {
    this._ocultarModal = true;
  }
  
}
