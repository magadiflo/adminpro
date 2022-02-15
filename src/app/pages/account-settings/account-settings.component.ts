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
  links!: NodeListOf<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(theme: string): void {
    const url: string = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);

    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    this.links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }

}
