import { Pais } from "./pais"

export class Persona{
    id : number = 0;
    nombres: string = '';
    apellidos: string = '';
    edad: number = 0;
    pais: Pais = { 
        id: 0,
        nombre: ''
    };
}