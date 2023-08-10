import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/classes/usuario';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base_url = environment.base_url
  usuario = new Usuario
  constructor(private http: HttpClient) { }
  get token(): string {
    return localStorage.getItem('token') || ''
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
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    }
  }
  getUsers() {

  }
  setUser() {

  }
  login(formData: any) {
    return this.http.post(`${this.base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
    )
  }
  register(formData: Usuario) {
    console.log('formData: ', formData);
    return this.http.post(`${this.base_url}/usuarios`, formData, this.headers)
  }
}
