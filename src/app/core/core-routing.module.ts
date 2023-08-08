import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CorePage } from './core.page'


const routes: Routes = [
  {
    path: '',
    component: CorePage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'carreras/carreras',
        loadChildren: () =>
          import(
            './pages/administracion/carreras/vista-carrera/vista-carrera.module'
          ).then((m) => m.VistaCarreraPageModule),
      },
      {
        path: 'carreras/crear-carrera',
        loadChildren: () =>
          import(
            './pages/administracion/carreras/crear-carrera/crear-carrera.module'
          ).then((m) => m.CrearCarreraPageModule),
      },
      {
        path: 'carreras/editar-carrera',
        loadChildren: () =>
          import(
            './pages/administracion/carreras/editar-carrera/editar-carrera.module'
          ).then((m) => m.EditarCarreraPageModule),
      },
      {
        path: 'catalogos/editar-catalogo',
        loadChildren: () =>
          import(
            './pages/administracion/catalogos/editar-catalogo/editar-catalogo.module'
          ).then((m) => m.EditarCatalogoPageModule),
      },
      {
        path: 'catalogos/crear-catalogo',
        loadChildren: () =>
          import(
            './pages/administracion/catalogos/crear-catalogo/crear-catalogo.module'
          ).then((m) => m.CrearCatalogoPageModule),
      },
      {
        path: 'catalogos/catalogos',
        loadChildren: () =>
          import(
            './pages/administracion/catalogos/vista-catalogo/vista-catalogo.module'
          ).then((m) => m.VistaCatalogoPageModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorePageRoutingModule { }
