import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PagesRoutingModule } from './pages/pages.routing';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';

const routes: Routes = [  
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent, },
  { path: '**', component: NotPageFoundComponent, },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
