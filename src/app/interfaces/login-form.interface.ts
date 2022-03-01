export interface LoginForm {
    nombre: string,
    email: string,
    remember: boolean,
}

export interface LoginResponse {
    ok: boolean,
    token: string,
}