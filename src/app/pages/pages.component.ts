import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';

//Llamamos a un método que está de manera global en el archivo \assets\js\custom.js
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
