import { Component } from '@angular/core';

import { Observable, retry, interval, take, map } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    // this.retornaObservable()
    //   .pipe(
    //     retry(1) //Captura el error cuando i = 2 y lo vuelve a intentar, pero ya i se incrementa a 3 por que está de manera global. (1) es el número de intentos a realizar
    //   ).subscribe({
    //     next: (valor) => console.log('Subs:', valor),
    //     error: (error) => console.warn('Error:', error),
    //     complete: () => console.info('Se completó...'),
    //   });

    this.retornaIntervalo()
      .subscribe(console.log);
  }

  retornaIntervalo(): Observable<string> {
    return interval(1000)
      .pipe(
        take(4), //cuántas emisiones del observable necesita. Es decir cuando llegue a 4 emisiones, finalizará
        map(valor => `Cadena retornada ${valor + 1}`), //El map, transforma la información que recibe el observable y mutarla según yo lo necesite
      );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llegó al valo de 2');
        }
      }, 1000);
    });
  }

}
