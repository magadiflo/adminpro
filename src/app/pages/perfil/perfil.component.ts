import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  miFormulario!: FormGroup;
  usuario: Usuario;
  imagenSubir!: File;
  imgTemp: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(): void {
    this.usuarioService.actualizarPerfil(this.miFormulario.value)
      .subscribe(ok => {
        if (ok === true) {
          const { nombre, email } = this.miFormulario.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actualización exitosa',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });
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
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Avatar actualizado',
          showConfirmButton: false,
          timer: 1500
        });
      }).catch(err => Swal.fire('Error', 'No se pudo subir la imagen', 'error'));
  }

}
