import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public miFormulario: FormGroup = this.fb.group({
    nombre: ['Martín', [Validators.required, Validators.minLength(3)]],
    email: ['magadiflo@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required]],
    password2: ['12345', [Validators.required]],
    terminos: [true, [Validators.requiredTrue]],
  }, {
    validators: [this.passwordsIguales('password', 'password2')],
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) { }

  crearUsuario(): void {
    this.formSubmitted = true;
    if (this.miFormulario.invalid) {
      return;
    }
    //Realizar el posteo
    this.usuarioService.crearUsuario(this.miFormulario.value)
      .subscribe(ok => {
        if(ok === true){
          this.router.navigateByUrl("/");
        } else {
          Swal.fire('¡Ups! Algo salió mal', ok, 'error');
        }
      });
  }

  campoNoValido(campo: string): boolean {
    return this.miFormulario.get(campo)!.invalid && this.formSubmitted;
  }

  aceptaTerminos(): boolean {
    return !this.miFormulario.get('terminos')!.value && this.formSubmitted;
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.miFormulario.get('password')?.value;
    const pass2 = this.miFormulario.get('password2')?.value;
    return (pass1 !== pass2) && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control?.value !== pass2Control?.value) {
        formGroup.get(pass2Name)?.setErrors({ noEsIgual: true });
        return { noEsIgual: true };
      }
      formGroup.get(pass2Name)?.setErrors(null);
      return null;
    }
  }

}
