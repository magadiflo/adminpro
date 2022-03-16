import { Component } from '@angular/core';

import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
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

  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService) { }

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

  subirImagen(): void {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Avatar actualizado',
          showConfirmButton: false,
          timer: 1500
        });
        //Cuando se haya cambiado la imagen emitimos la misma, el cual estará siendo
        //subscrito en el usuarios.component para recargar la lista de usuarios
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => Swal.fire('Error', 'No se pudo subir la imagen', 'error'));
  }

}
