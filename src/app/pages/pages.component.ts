import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  linkTheme: HTMLElement = document.getElementById('theme')!;

  constructor() { }

  ngOnInit(): void {
    const url: string = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

}
