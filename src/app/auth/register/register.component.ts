import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public miFormulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terminos: [false, [Validators.required]],
  });

  constructor(private fb: FormBuilder) { }

  crearUsuario(): void {
    this.formSubmitted = true;
    if (this.miFormulario.valid && this.miFormulario.controls['terminos'].value) {
      console.log('Posteando formulario...');
    } else {
      console.log('Formulario no es correcto...');
    }
  }

  campoNoValido(campo: string): boolean {
    return this.miFormulario.get(campo)!.invalid && this.formSubmitted;
  }

  aceptaTerminos(): boolean {
    return !this.miFormulario.get('terminos')!.value && this.formSubmitted;
  }

}
