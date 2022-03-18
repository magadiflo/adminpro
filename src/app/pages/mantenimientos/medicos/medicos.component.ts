import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos: Medico[] = [];
  cargando: boolean = true;
  imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(500)
      )
      .subscribe(img => this.cargarMedicos());
  }

  cargarMedicos(): void {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
      });
  }

  abrirModal(medico: Medico): void {
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);
  }

  buscar(termino: string): void {
    if (termino.trim().length === 0) {
      this.cargarMedicos();
      return;
    }
    this.busquedaService.buscar('medicos', termino.trim())
      .subscribe(resultados => {
        this.medicos = <Medico[]>resultados;
      });
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Está a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id!)
          .subscribe({
            next: (resp) => {
              Swal.fire(
                '¡Médico eliminado!',
                `El médico ${medico.nombre} fue eliminado de su BD`,
                'success'
              );
              this.cargarMedicos();
            },
            error: ({ error }) => {
              Swal.fire(
                '¡Ups, hubo problemas al eliminar!',
                `${error.msg}`,
                'error'
              );
            },
          });
      }
    });
  }

}
