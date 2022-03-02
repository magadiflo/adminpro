import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.usuarioService.validarToken()
      .pipe(
        tap(estaAutenticado => {
          if(!estaAutenticado){
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
