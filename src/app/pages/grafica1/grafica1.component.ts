import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
    
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['Pan', 'Panetón', 'Cachitos'];
  public data1 = [[10, 15, 40]];
  
  public labels2: string[] = ['Manzana', 'Palta', 'Plátanos'];
  public data2 = [[67, 150, 85]];

  public labels3: string[] = ['Hombres', 'Mujeres'];
  public data3 = [[450, 380]];

}
