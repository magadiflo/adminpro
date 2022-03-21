import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

//Llamamos a un método que está de manera global en el archivo \assets\js\custom.js
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();  
  }

}
