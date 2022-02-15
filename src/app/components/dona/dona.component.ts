import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Color } from "ng2-charts";

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
    `.contenedor {
      display: blocK;
    }`
  ]
})
export class DonaComponent{

  @Input() title: string = 'Sin título';
  @Input() labels: Label[] = [];
  @Input() data: MultiDataSet = [];

  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ];

}
