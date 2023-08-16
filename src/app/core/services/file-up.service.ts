import { Injectable } from '@angular/core'
import { FunctionsService } from 'src/app/services/functions.service'

import { environment } from 'src/environments/environment'


const base_url = environment.base_url
@Injectable({
  providedIn: 'root',
})
export class FileUpService {
  constructor(private functionsService: FunctionsService) { }
  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'alumnos' | 'maestros' | 'padres' | 'tutoriales',
    id: string,
  ) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`
      const formData = new FormData()
      formData.append('imagen', archivo)
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      })
      const data = await resp.json()
      if (data.ok) {
        return data.nombreArchivo
      } else {
        return false
      }
    } catch (error) {
      console.log('error', error)
      return false
    }
  }
  async subirFoto(
    archivo: File,
    tipo: string
  ) {

    try {
      const url = `${base_url}/upload/img/${tipo}`
      console.log('url: ', url);
      const formData = new FormData()
      formData.append('imagen', archivo)

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.functionsService.getLocal('token') || '',
        },
        body: formData,
      })
      const data = await resp.json()
      if (data.ok) {
        return data.nombreArchivo
      } else {
        return false
      }
    } catch (error) {
      console.log('error', error)
      return false
    }
  }
}
