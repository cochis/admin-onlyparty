import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Comercio } from '../classes/comercio';
import { FunctionsService } from 'src/app/services/functions.service';

@Injectable({
  providedIn: 'root'
})
export class ComerciosService {
  base_url = environment.base_url
  constructor(
    private http: HttpClient,
    private functionService: FunctionsService

  ) { }
  get token(): any {

    return this.functionService.getLocal('token').data

  }
  get user(): any {

    return this.functionService.getLocal('uid').data

  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    }
  }
  nuevoComercio(comercio: Comercio) {
    comercio = {
      ...comercio,
      lastEdited: Date.now(),
      usuario: this.user
    }
    console.log('comercio: ', comercio);
    console.log(this.headers);
    return this.http.post(`${this.base_url}/comercios`, comercio, this.headers)
  }
  getComercios() {
    return this.http.get(`${this.base_url}/comercios`, this.headers)
  }
  cargarComercioById(id: string) {
    const url = `${this.base_url}/comercios/${id}`
    return this.http.get(url, this.headers)
  }
  cargarCatalogoByTipo(tipo: string) {
    const url = `${this.base_url}/catalogos/tipo/${tipo}`
    return this.http.get(url, this.headers)
  }
  cargarCatalogoByCategoria(categoria: string) {
    const url = `${this.base_url}/catalogos/categoria/${categoria}`
    return this.http.get(url, this.headers)
  }
  actualizarComercio(comercio: Comercio) {
    comercio.lastEdited = Date.now()

    return this.http.put(
      `${this.base_url}/comercios/${comercio.uid}`,
      comercio,
      this.headers,
    )
  }

  activeComercio(comercio: Comercio) {

    return this.http.put(`${this.base_url}/comercios/activarComercio/${comercio.uid}`, comercio, this.headers)
  }

}
