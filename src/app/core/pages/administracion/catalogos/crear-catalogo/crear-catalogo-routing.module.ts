import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearCatalogoPage } from './crear-catalogo.page';

const routes: Routes = [
  {
    path: '',
    component: CrearCatalogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearCatalogoPageRoutingModule {}
