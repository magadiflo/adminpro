import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NotPageFoundComponent } from './not-page-found/not-page-found.component';

const routes: Routes = [
  { path: '**', component: NotPageFoundComponent, },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
