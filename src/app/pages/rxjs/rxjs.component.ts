import { Component } from '@angular/core';

import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    const obs$ = new Observable(observer => {
      let i = -1;
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if(i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        if(i === 2) {
          i = 0;
          observer.error('i llegó al valo de 2');
        }
      }, 1000);
    });

    obs$.pipe( 
      retry(2) //Captura el error cuando i = 2 y lo vuelve a intentar, pero ya i se incrementa a 3 por que está de manera global. (2) es el número de intentos a realizar
    ).subscribe({
      next: (valor) => console.log('Subs:', valor),
      error: (error) => console.warn('Error:', error),
      complete: () => console.info('Se completó...')
    });
  }

}
