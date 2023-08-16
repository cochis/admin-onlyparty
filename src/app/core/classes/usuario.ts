export class Usuario {
    nombre!: string;
    apellidoPaterno!: string;
    apellidoMaterno!: string;
    email!: string;
    img!: string;
    google!: boolean;
    password!: string;
    role!: string[];
    uid!: string;
    dateCreated!: number;
    lastEdited!: number;
    activated!: boolean;


    constructor(nombre = "", email = "", activated = false, dateCreated = 0, lastEdited = 0, img = "", google = false, password = "", usuarioCreated = "", apellidoPaterno = "", apellidoMaterno = "", role = ["USER_ROLE"], uid = "") {
        this.nombre = nombre
        this.email = email
        this.img = img
        this.google = google
        this.password = password
        this.apellidoPaterno = apellidoPaterno
        this.apellidoMaterno = apellidoMaterno
        this.role = role
        this.activated = activated
        this.dateCreated = dateCreated
        this.lastEdited = lastEdited
        this.uid = uid
    }
}
