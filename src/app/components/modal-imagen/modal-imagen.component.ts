import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
    `#responsive-modal {
        display: block; 
        padding-right: 17px;
      }`
  ]
})
export class ModalImagenComponent implements OnInit {

  ocultarModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  cerrarModal(): void {
    this.ocultarModal = true;
  }

}
