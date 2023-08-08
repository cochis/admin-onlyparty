import { Component, OnInit } from '@angular/core'
import { environment } from 'src/environments/environment'
import { FunctionsService } from './services/functions.service'

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
          titulo: 'Carreras',
          menus: [
            {
              titulo: 'Ver Carreras',
              url: '/core/carreras/carreras',
              icon: 'eye',
            },
            {
              titulo: 'crear',
              url: '/core/carreras/crear-carrera',
              icon: 'add-circle',
            },
            {
              titulo: 'editar',
              url: '/core/carreras/editar-carrera',
              icon: 'pencil',
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
            {
              titulo: 'editar',
              url: '/core/catalogos/editar-catalogo',
              icon: 'pencil',
            },
          ],
        },

      ],
    },
    // {
    //   titulo: 'Maestro',
    //   modulos: [
    //     {
    //       titulo: 'Carreras',
    //       menus: [
    //         {
    //           titulo: 'crear',
    //           url: '/crear/carrera',
    //           icon: 'add-circle',
    //         },
    //         {
    //           titulo: 'editar',
    //           url: '/editar/carrera',
    //           icon: 'pencil',
    //         },
    //         {
    //           titulo: 'desactivar',
    //           url: '/desactivar/carrera',
    //           icon: 'trash',
    //         },
    //       ],
    //     },
    //     {
    //       titulo: 'Horarios',
    //       menus: [
    //         {
    //           titulo: 'crear',
    //           url: '/crear/carrera',
    //           icon: 'add-circle',
    //         },
    //         {
    //           titulo: 'editar',
    //           url: '/editar/carrera',
    //           icon: 'pencil',
    //         },
    //         {
    //           titulo: 'desactivar',
    //           url: '/desactivar/carrera',
    //           icon: 'trash',
    //         },
    //       ],
    //     },
    //     {
    //       titulo: 'Ciclos escolares',
    //       menus: [
    //         {
    //           titulo: 'crear',
    //           url: '/crear/carrera',
    //           icon: 'add-circle',
    //         },
    //         {
    //           titulo: 'editar',
    //           url: '/editar/carrera',
    //           icon: 'pencil',
    //         },
    //         {
    //           titulo: 'desactivar',
    //           url: '/desactivar/carrera',
    //           icon: 'trash',
    //         },
    //       ],
    //     },
    //     {
    //       titulo: 'Grupos',
    //       menus: [
    //         {
    //           titulo: 'crear',
    //           url: '/crear/carrera',
    //           icon: 'add-circle',
    //         },
    //         {
    //           titulo: 'editar',
    //           url: '/editar/carrera',
    //           icon: 'pencil',
    //         },
    //         {
    //           titulo: 'desactivar',
    //           url: '/desactivar/carrera',
    //           icon: 'trash',
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   titulo: 'Alumno',
    //   modulos: [
    //     {
    //       titulo: 'Horarios',
    //       menus: [
    //         {
    //           titulo: 'crear',
    //           url: '/crear/carrera',
    //           icon: 'add-circle',
    //         },
    //         {
    //           titulo: 'editar',
    //           url: '/editar/carrera',
    //           icon: 'pencil',
    //         },
    //         {
    //           titulo: 'desactivar',
    //           url: '/desactivar/carrera',
    //           icon: 'trash',
    //         },
    //       ],
    //     },
    //     {
    //       titulo: 'Boleta',
    //       menus: [
    //         {
    //           titulo: 'crear',
    //           url: '/crear/carrera',
    //           icon: 'add-circle',
    //         },
    //         {
    //           titulo: 'editar',
    //           url: '/editar/carrera',
    //           icon: 'pencil',
    //         },
    //         {
    //           titulo: 'desactivar',
    //           url: '/desactivar/carrera',
    //           icon: 'trash',
    //         },
    //       ],
    //     },
    //     {
    //       titulo: 'Historial academico',
    //       menus: [
    //         {
    //           titulo: 'crear',
    //           url: '/crear/carrera',
    //           icon: 'add-circle',
    //         },
    //         {
    //           titulo: 'editar',
    //           url: '/editar/carrera',
    //           icon: 'pencil',
    //         },
    //         {
    //           titulo: 'desactivar',
    //           url: '/desactivar/carrera',
    //           icon: 'trash',
    //         },
    //       ],
    //     },
    //     {
    //       titulo: 'Evaluacion  Profesores',
    //       menus: [
    //         {
    //           titulo: 'crear',
    //           url: '/crear/carrera',
    //           icon: 'add-circle',
    //         },
    //         {
    //           titulo: 'editar',
    //           url: '/editar/carrera',
    //           icon: 'pencil',
    //         },
    //         {
    //           titulo: 'desactivar',
    //           url: '/desactivar/carrera',
    //           icon: 'trash',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]

  constructor(private functionsService: FunctionsService) { }

  navigate(url: string) {
    this.functionsService.navigate(url)
  }
}
