import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css',
  ]
})
export class ProgressComponent {

  progreso: number = 50;

  get porcentaje(): string {
    return `${ this.progreso }%`;
  }

  cambiarValor(valor: number): void {
    if(this.progreso >= 100 && valor >= 0){
      this.progreso = 100;
      return;
    }

    if(this.progreso <= 0 && valor < 0){
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
  }

}
