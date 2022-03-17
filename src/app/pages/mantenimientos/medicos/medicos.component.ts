import { Component, OnInit } from '@angular/core';

import { Medico } from '../../../models/medico.model';

import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean = true;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos();
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

}
