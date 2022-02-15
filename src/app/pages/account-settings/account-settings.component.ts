import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
    `#themecolors .selector {
      cursor: pointer;
    }`
  ]
})
export class AccountSettingsComponent implements OnInit {
  
  linkTheme: HTMLElement = document.getElementById('theme')!;

  constructor() { }

  ngOnInit(): void {
  }

  changeTheme(theme: string): void {
    const url: string = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);

    localStorage.setItem('theme', url);
  }

}
