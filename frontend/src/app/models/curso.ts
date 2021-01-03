export class Curso {
    
    constructor(_id = '', nombre = '', codigo = '', grupo = '') {
        this._id = _id;
        this.nombre = nombre;
        this.codigo= codigo;
        grupo = grupo;
  
    }

    _id: string;
    nombre: string;
    codigo: string;
    grupo: number;
    

}
