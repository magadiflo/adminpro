import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });

    //************* EJEMPLO DE PROMESA *******************/
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Algo salió mal...');
    //   }
    // });

    // promesa.then(mensaje => {
    //   console.log('Se terminoó...', mensaje);
    // }).catch(error => {
    //   console.log('ERROR: ', error);
    // });

    // console.log('Fin del Init');
  }

  getUsuarios() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });
  }

}
