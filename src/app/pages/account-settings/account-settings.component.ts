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

  constructor() { }

  ngOnInit(): void {
  }

}
