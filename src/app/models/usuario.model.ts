import { environment } from "../../environments/environment";
import { Rol } from '../interfaces/rol.interface';

const baseUrl: string = environment.baseUrl;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: Rol,
        public uid?: string) { }

    get imagenUrl() {
        if(this.img?.includes('https')) return this.img;
        const image = (this.img) ? this.img : 'no-image';
        return `${baseUrl}/upload/usuarios/${image}`;
    }

}