import { Component, OnInit } from '@angular/core'
import { environment } from 'src/environments/environment'
import { FunctionsService } from '../services/functions.service'


@Component({
  selector: 'app-core',
  templateUrl: './core.page.html',
  styleUrls: ['./core.page.scss'],
})
export class CorePage {
  version = environment.ver
  public apartados: any = [
    {
      titulo: 'Administrador',
      modulos: [
        {
          titulo: 'Usuarios',
          menus: [
            {
              titulo: 'Ver Usuarios',
              url: '/core/usuarios/usuarios',
              icon: 'eye',
            },
            {
              titulo: 'crear',
              url: '/core/usuarios/crear-usuario',
              icon: 'add-circle',
            },

          ],
        },
        {
          titulo: 'Catalogos',
          menus: [
            {
              titulo: 'Ver Catalogos',
              url: '/core/catalogos/catalogos',
              icon: 'eye',
            },
            {
              titulo: 'crear',
              url: '/core/catalogos/crear-catalogo',
              icon: 'add-circle',
            },

          ],
        },
        {
          titulo: 'Comercios',
          menus: [
            {
              titulo: 'Ver Comercios',
              url: '/core/comercios/comercios',
              icon: 'eye',
            },
            {
              titulo: 'crear',
              url: '/core/comercios/crear-comercio',
              icon: 'add-circle',
            },

          ],
        },

      ],
    },

  ]

  constructor(private functionsService: FunctionsService) { }

  navigate(url: string) {
    this.functionsService.navigate(url)
  }
}
