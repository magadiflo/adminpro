import { Component, OnDestroy } from '@angular/core';

import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(
    //     retry(1) //Captura el error cuando i = 2 y lo vuelve a intentar, pero ya i se incrementa a 3 por que está de manera global. (1) es el número de intentos a realizar
    //   ).subscribe({
    //     next: (valor) => console.log('Subs:', valor),
    //     error: (error) => console.warn('Error:', error),
    //     complete: () => console.info('Se completó...'),
    //   });

    this.intervalSubs = this.retornaIntervalo()
      .subscribe(console.log);
  }
  
  ngOnDestroy(): void {
    console.log('método OnDestroy().... destruyendo el observable');  
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100)
      .pipe(
        //take(10), //cuántas emisiones del observable necesita. Es decir cuando llegue a 10 emisiones, finalizará
        map(valor1 => valor1 + 1), //El map, transforma la información que recibe el observable y mutarla según yo lo necesite
        filter(valor2 => valor2 % 2 === 0),
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
