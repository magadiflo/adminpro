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
}

export interface Usuario {
    role: string,
    google: boolean,
    nombre: string,
    email: string,
    uid: string,
}