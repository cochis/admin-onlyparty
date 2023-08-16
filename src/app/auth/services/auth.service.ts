import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/classes/usuario';
import { tap } from 'rxjs';
import { FunctionsService } from 'src/app/services/functions.service';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base_url = environment.base_url
  usuario = new Usuario
  constructor(private http: HttpClient,
    private functionsService: FunctionsService) { }
  get token(): string {
    let data: any = this.functionsService.getLocal('token')
    return data.data || ''
  }
  get uid(): string {
    return this.usuario.uid || ''
  }
  get role(): string {
    return this.usuario.role[0] || ''
  }
  get nombre(): string {
    return this.usuario.nombre || ''
  }
  get email(): string {
    return this.usuario.email || ''
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    }
  }
  getUsers() {
    console.log('entro');

    return this.http.get(`${this.base_url}/usuarios/all`, this.headers)
  }
  setUser() {

  }
  login(formData: any) {
    return this.http.post(`${this.base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.functionsService.setLocal('token', resp.token)
      }),
    )
  }
  register(formData: Usuario) {
    console.log('his.headers: ', this.headers);
    console.log('formData: ', formData);
    return this.http.post(`${this.base_url}/usuarios`, formData, this.headers)
  }

  cargarUsuarioById(id: string) {
    const url = `${this.base_url}/usuarios/${id}`
    return this.http.get(url, this.headers)
  }

  activeUsuario(usuario: Usuario) {

    return this.http.put(`${this.base_url}/usuarios/activarUsuario/${usuario.uid}`, usuario, this.headers)
  }

  actualizarUsuario(usuario: Usuario) {

    console.log('this.usuario: ', this.usuario);
    return this.http.put(`${this.base_url}/usuarios/${usuario.uid}`, usuario, this.headers)
  }
}
