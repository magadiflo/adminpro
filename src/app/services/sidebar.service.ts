import { Injectable } from '@angular/core';

import { Menu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: Menu[] = [];

  cargarMenu() {
    //Se podría hacer que cuando el menú esté vacío, redireccionar al usuario al login
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }

  // menu: Menu[] = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-hand-pointing-right',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //       { titulo: 'Gráficas', url: 'grafica1' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'RxJs', url: 'rxjs' },
  //     ],
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Medicos', url: 'medicos' },
  //     ],
  //   },
  // ];


}
