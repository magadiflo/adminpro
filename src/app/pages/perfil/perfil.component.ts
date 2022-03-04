import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  miFormulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(): void {
    console.log(this.miFormulario.value);
    this.usuarioService.actualizarPerfil(this.miFormulario.value)
      .subscribe(resp => {
        console.log(resp);
      });
  }

}
