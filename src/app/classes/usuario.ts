
export class Usuario {
    nombre!: string;
    email!: string;
    activated!: boolean;
    dateCreated!: number;
    clave!: string;
    img!: string;
    google!: boolean;
    password!: string;
    lastEdited!: number;
    apellidoPaterno!: string;
    apellidoMaterno!: string;
    role!: string[];
    uid!: string;


    constructor(nombre = "", email = "", activated = false, lastEditeddateCreated = 0, clave = "", img = "", google = false, password = "", usuarioCreated = "", apellidoPaterno = "", apellidoMaterno = "", role = ["USER_ROLE"], uid = "", dateCreated = 0, lastEdited = 0) {
        this.nombre = nombre
        this.email = email
        this.activated = activated
        this.dateCreated = dateCreated
        this.lastEdited = lastEdited
        this.clave = clave
        this.img = img
        this.google = google
        this.password = password
        this.apellidoPaterno = apellidoPaterno
        this.apellidoMaterno = apellidoMaterno
        this.role = role
        this.uid = uid
    }
}
