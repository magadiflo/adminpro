import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Hospital } from '../../../../models/hospital.model';
import { Medico } from '../../../../models/medico.model';

import { HospitalService } from '../../../../services/hospital.service';
import { MedicoService } from '../../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospitalSeleccionado!: Hospital;
  medicoSeleccionado!: Medico;

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    hospital: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarHospitales();
    //Observable que escucha el cambio del SELECT
    this.miFormulario.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId)!;
      });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.miFormulario.value;
    this.medicoService.crearMedico(this.miFormulario.value)
      .subscribe(({ medico }) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Se guardó al médico ${nombre}`,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl(`/dashboard/medico/${medico._id}`);
      });
  }

}
