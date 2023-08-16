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
        path: 'catalogos/editar-catalogo/:edit/:id',
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
      {
        path: 'usuarios/crear-usuario',
        loadChildren: () => import('./pages/administracion/usuarios/crear-usuario/crear-usuario.module').then(m => m.CrearUsuarioPageModule)
      },
      {
        path: 'usuarios/editar-usuario/:edit/:id',
        loadChildren: () => import('./pages/administracion/usuarios/editar-usuario/editar-usuario.module').then(m => m.EditarUsuarioPageModule)
      },
      {
        path: 'usuarios/usuarios',
        loadChildren: () => import('./pages/administracion/usuarios/vista-usuario/vista-usuario.module').then(m => m.VistaUsuarioPageModule)
      },
      {
        path: 'comercios/crear-comercio',
        loadChildren: () => import('./pages/administracion/comercios/crear-comercio/crear-comercio.module').then(m => m.CrearComercioPageModule)
      },
      {
        path: 'comercios/editar-comercio/:edit/:id',
        loadChildren: () => import('./pages/administracion/comercios/editar-comercio/editar-comercio.module').then(m => m.EditarComercioPageModule)
      },
      {
        path: 'comercios/comercios',
        loadChildren: () => import('./pages/administracion/comercios/vista-comercio/vista-comercio.module').then(m => m.VistaComercioPageModule)
      },
    ],
  },
  {
    path: 'crear-servicio',
    loadChildren: () => import('./pages/administracion/servicios/crear-servicio/crear-servicio.module').then( m => m.CrearServicioPageModule)
  },
  {
    path: 'editar-servicio',
    loadChildren: () => import('./pages/administracion/servicios/editar-servicio/editar-servicio.module').then( m => m.EditarServicioPageModule)
  },
  {
    path: 'vista-servicio',
    loadChildren: () => import('./pages/administracion/servicios/vista-servicio/vista-servicio.module').then( m => m.VistaServicioPageModule)
  },


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorePageRoutingModule { }
