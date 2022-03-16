import { Hospital } from '../models/hospital.model';

export interface ListaHospitales {
    ok: boolean,
    hospitales: Hospital[],
}