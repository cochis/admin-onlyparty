
export class Comercio {
    id!: number;
    categoria!: Categoria;
    nombre!: string;
    imagenes!: string[];
    ofrece!: Ofrece[];
}

export class Ofrece {
    servicios!: Servicio[];
    productos!: Producto[];
}

export class Servicio {
    id!: number;
    nombre!: string;
    icon!: string;
    tipo!: string;
    valueMin?: number;
    valueMax?: number;
    imagenes!: string[];
    incluye?: boolean;
}
export class Producto {
    id!: number;
    nombre!: string;
    icon!: string;
    tipo!: string;
    valueMin?: number;
    valueMax?: number;
    imagenes!: string[];
    incluye?: boolean;

}
export class Categoria {
    id: number;
    nombre: string;
    icon: string;
    activated: boolean;
    createdAt: number;
    createdBy: string;


    constructor(id = 0, nombre = '', icon = '', activated = false, createdAt = Date.now(), createdBy = '') {
        this.id = id
        this.nombre = nombre;
        this.icon = icon;
        this.activated = activated;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
    }
}