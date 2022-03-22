import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NotPageFoundComponent } from './not-page-found/not-page-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**', component: NotPageFoundComponent, },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      useHash: true, // Indica que se use el hash # en la url
    }),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
