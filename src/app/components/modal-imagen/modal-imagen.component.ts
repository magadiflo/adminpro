import { Component } from '@angular/core';

import { ModalImagenService } from '../../services/modal-imagen.service';

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
export class ModalImagenComponent {  

  constructor(public modalImagenService: ModalImagenService) { }

  cerrarModal(): void {
    this.modalImagenService.cerrarModal();
  }

}
