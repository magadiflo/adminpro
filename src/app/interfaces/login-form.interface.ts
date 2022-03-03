export interface LoginForm {
    nombre: string,
    email: string,
    remember: boolean,
}

export interface LoginResponse {
    ok: boolean,
    token: string,
    usuario?: UsuarioResponse 
}

export interface UsuarioResponse {
    nombre: string,
    email: string,
    role?: string,
    google?: boolean,
    uid?: string,
    img?: string,
}