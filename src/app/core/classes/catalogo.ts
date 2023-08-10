
export class Catalogo {
    nombre: string;
    tipo: string;
    clave: string;
    categoria: string;
    value: string;
    img: string;
    activated: boolean;
    dateCreated: number;
    lastEdited: number;
    descripcion: string;
    usuarioCreated: string;
    uid: string;


    constructor(nombre = '', tipo = '', clave = '', categoria = '', value = '', img = '', activated = false, dateCreated = 0, lastEdited = 0, descripcion = '', usuarioCreated = '', uid = '',) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.clave = clave;
        this.categoria = categoria;
        this.value = value;
        this.img = img;
        this.activated = activated;
        this.dateCreated = dateCreated;
        this.lastEdited = lastEdited;
        this.descripcion = descripcion;
        this.usuarioCreated = usuarioCreated;
        this.uid = uid;
    }

}

