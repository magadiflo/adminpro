import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
    `.img-table {
      width: 80px;
    }`
  ]
})
export class UsuariosComponent implements OnInit {

  totalUsuarios: number = 0;
  usuarios: Usuario[] = [];
  usuariosTemp: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string): void {
    if (termino.trim().length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }
    this.busquedasService.buscar('usuarios', termino.trim())
      .subscribe(resultados => {
        this.usuarios = resultados;
      });
  }

  eliminarUsuario(usuario: Usuario): void {
    if(usuario.uid === this.usuarioService.uid){
      Swal.fire('Error', 'No puede borrarse a sí mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe({
            next: (resp) => {
              Swal.fire(
                '¡Usuario eliminado!',
                `El usuario ${usuario.nombre} fue eliminado de su BD`,
                'success'
              );
              this.cargarUsuarios();
            },
            error: ({ error }) => {
              Swal.fire(
                '¡Ups, hubo problemas al eliminar!',
                `${error.msg}`,
                'error'
              );
            },
          });
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        console.log(resp);  
      });
  }

}
