import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Catalogo } from '../classes/catalogo';
import { FunctionsService } from './functions.service';



@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  base_url = environment.base_url
  constructor(
    private http: HttpClient,
    private functionService: FunctionsService

  ) { }
  get token(): any {

    return this.functionService.getLocal('token').data

  }
  get user(): any {
    console.log('t ', this.functionService.getLocal('uid'));
    return this.functionService.getLocal('uid').data

  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    }
  }

  nuevoCatalogo(catalogo: Catalogo) {
    catalogo = {
      ...catalogo,
      usuarioCreated: this.user
    }
    return this.http.post(`${this.base_url}/catalogos`, catalogo, this.headers)
  }
  getCatalogos() {
    return this.http.get(`${this.base_url}/catalogos`, this.headers)
  }
  cargarCatalogoById(id: string) {
    const url = `${this.base_url}/catalogos/${id}`
    return this.http.get(url, this.headers)
  }
  actualizarCatalogo(catalogo: Catalogo) {
    catalogo.lastEdited = Date.now()

    return this.http.put(
      `${this.base_url}/catalogos/${catalogo.uid}`,
      catalogo,
      this.headers,
    )
  }

  activeCatalogo(catalogo: Catalogo) {

    return this.http.put(`${this.base_url}/catalogos/activarCatalogo/${catalogo.uid}`, catalogo, this.headers)
  }
}
