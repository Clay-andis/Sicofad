

export class Docente {

    constructor(_id = '', codigo = '', nombre = '', carga_academica='') {
        this._id = _id;
        this.codigo = codigo;
        this.nombre = nombre;
         carga_academica= carga_academica
    }
      
    _id: string;
    codigo: string;
    nombre: string;
    carga_academica: {
        c_nombre : String;
        c_codigo:String;
        c_grupo: Number
    }
       
    
    
}
