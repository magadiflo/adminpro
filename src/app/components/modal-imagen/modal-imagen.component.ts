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

  imagenSubir!: File;
  imgTemp: string = '';

  constructor(public modalImagenService: ModalImagenService) { }

  cerrarModal(): void {
    this.imgTemp = '';
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event: Event) {
    this.imagenSubir = (event.target as HTMLInputElement).files![0];
    if(!this.imagenSubir){
      this.imgTemp = '';
      return; 
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.imagenSubir);
    reader.onloadend = () => {
      this.imgTemp = (reader.result as string);
    }

  }

}
