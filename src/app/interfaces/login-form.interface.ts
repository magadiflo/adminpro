import { Menu } from './menu.interface';
import { Rol } from './rol.interface';

export interface LoginForm {
    nombre: string,
    email: string,
    remember: boolean,
}

export interface LoginResponse {
    ok: boolean,
    token: string,
    menu?: Menu[],
    usuario?: UsuarioResponse
}

export interface UsuarioResponse {
    nombre: string,
    email: string,
    role?: Rol,
    google?: boolean,
    uid?: string,
    img?: string,
}