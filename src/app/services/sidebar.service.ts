import { Injectable } from '@angular/core';

interface Menu {
  titulo: string,
  icono: string,
  submenu: SubMenu[],
}

interface SubMenu {
  titulo: string,
  url: string,
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: Menu[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-hand-pointing-right',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
      ],
    }
  ];

  constructor() { }
}
