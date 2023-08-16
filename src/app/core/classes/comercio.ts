
export class Comercio {
    usuario!: string;
    nombre!: string;
    direccion!: string;
    email!: string;
    telefonos!: number[];
    whatsapp!: number;
    redes!: string[];
    servicios!: string[];
    productos!: string[];
    paquetes!: string[];
    imagenes!: string[];
    horarioAtencion!: string;
    activated!: boolean;
    dateCreated!: number;
    lastEdited!: number;
    uid!: string;
    constructor(usuario = "", nombre = "", direccion = "", email: "", telefonos = [0], whatsapp = 0, redes = [], servicios = [], productos = [], paquetes = [], imagenes = [], horarioAtencion = "", activated = false, dateCreated = 0, lastEdited = 0, uid = "") {

        this.usuario = usuario
        this.nombre = nombre
        this.direccion = direccion
        this.email = email
        this.telefonos = telefonos
        this.whatsapp = whatsapp
        this.redes = redes
        this.servicios = servicios
        this.productos = productos
        this.paquetes = paquetes
        this.imagenes = imagenes
        this.horarioAtencion = horarioAtencion
        this.activated = activated
        this.dateCreated = dateCreated
        this.lastEdited = lastEdited
        this.uid = uid
    }
}
