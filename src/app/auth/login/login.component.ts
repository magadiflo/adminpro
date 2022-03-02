import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
  ],
})
export class LoginComponent {

  public auth2: any;

  public miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.miFormulario.controls['email'].setValue(localStorage.getItem('email') || '');
    if (this.miFormulario.controls['email'].value.length > 1) {
      this.miFormulario.controls['remember'].setValue(true);
    }
    this.renderButton();
  }

  login(): void {
    this.usuarioService.login(this.miFormulario.value)
      .subscribe(ok => {
        if (ok === true) {
          this.router.navigateByUrl('/');
        } else {
          Swal.fire('¡Lo sentimos!', ok, 'error');
        }
      });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '70858709123-fcvm26auhk4us67vhrmj2ashsi2925ls.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2')!);
    });
  }

  attachSignin(element: HTMLElement) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token; 
        // console.log(id_token);
        this.usuarioService.loginGoogle(id_token)
          .subscribe(ok => {
            if (ok === true) {
              this.router.navigateByUrl('/');
            } else {
              Swal.fire('¡Lo sentimos!', ok, 'error');
            } 
          });
      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
