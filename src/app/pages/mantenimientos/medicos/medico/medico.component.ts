import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { Hospital } from '../../../../models/hospital.model';
import { Medico } from '../../../../models/medico.model';

import { HospitalService } from '../../../../services/hospital.service';
import { MedicoService } from '../../../../services/medico.service';
import { delay } from 'rxjs';

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
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.activatedRoute.params
      .subscribe(({ id }) => {
        this.cargarMedico(id);
      });

    //Observable que escucha el cambio del SELECT
    this.miFormulario.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId)!;
      });
  }

  cargarMedico(id: string) {
    if (id.trim() === 'nuevo') return;
    this.medicoService.obtenerMedicoPorId(id)
      .pipe(
        delay(100)
      )
      .subscribe({
        next: medico => {
          if (!medico) {
            this.router.navigateByUrl('/dashboard/medicos');
            return;
          }
          const nombre = medico.nombre;
          const _id = medico.hospital?._id;
          this.medicoSeleccionado = medico;
          this.miFormulario.setValue({ nombre, hospital: _id });
        },
        error: err => {
          this.router.navigateByUrl('/dashboard/medicos');
        }
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
    if (this.medicoSeleccionado) { //actualizar
      const data = {
        ...this.miFormulario.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se actualizó el médico ${nombre}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    } else { //crear
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

}
