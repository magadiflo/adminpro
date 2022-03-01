import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
  ],
})
export class LoginComponent {

  public formSubmitted = false;

  public miFormulario: FormGroup = this.fb.group({
    email: ['magadiflo@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.usuarioService.login(this.miFormulario.value)
      .subscribe({
        next: (resp) => {
          console.log(resp);
        }, 
        error: (err) => {
          Swal.fire('¡Lo sentimos!', err.error.msg, 'error');
        } 
      });
    //this.router.navigateByUrl('/');  
  }

}
