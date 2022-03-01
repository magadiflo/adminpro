import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    nombre: ['Martín', [Validators.required, Validators.minLength(3)]],
    email: ['magadiflo@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required]],
    password2: ['12345', [Validators.required]],
    terminos: [true, [Validators.required]],
  }, {
    validators: this.passwordsIguales('password', 'password2')
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

  contrasenasNoValidas(): boolean {
    const pass1 = this.miFormulario.get('password')?.value;
    const pass2 = this.miFormulario.get('password2')?.value;
    return (pass1 !== pass2) && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }

}
