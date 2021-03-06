import { Usuario as UsuarioModel } from "../models/usuario.model";

import { Menu } from './menu.interface';

export interface RegisterForm {
    nombre: string,
    email: string,
    password: string,
    password2: string,
    terminos: boolean
}

export interface AuthResponse {
    ok: boolean,
    usuario?: Usuario,
    token?: string,
    msg?: string,
    menu?: Menu[]
}

export interface Usuario {
    role: string,
    google: boolean,
    nombre: string,
    email: string,
    img?: string,
    uid: string,
}

export interface ListaUsuarios {
    ok: boolean,
    total: number,
    usuarios: UsuarioModel[],
}