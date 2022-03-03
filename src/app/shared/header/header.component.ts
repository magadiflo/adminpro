import { Component } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;    
  }

  logout(): void {
    this.usuarioService.logout();
  }

}
