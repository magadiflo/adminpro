import { Pipe, PipeTransform } from '@angular/core';

import { environment } from 'src/environments/environment';

type Tipo = 'usuarios' | 'medicos' | 'hospitales';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  private baseUrl = environment.baseUrl;

  transform(img: string = '', tipo: Tipo): string {
    if (img.includes('https')) return img;
    const image = img ? img : 'no-image';
    return `${this.baseUrl}/upload/${tipo}/${image}`;
  }

}
