import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hospital } from '../../../../models/hospital.model';

import { HospitalService } from '../../../../services/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];

  miFormulario: FormGroup = this.fb.group({
    nombre: ['EsSalud', [Validators.required]],
    hospital: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    console.log(this.miFormulario.value);
  }

}
