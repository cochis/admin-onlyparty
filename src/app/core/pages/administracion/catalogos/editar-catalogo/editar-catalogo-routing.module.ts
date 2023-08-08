import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarCatalogoPage } from './editar-catalogo.page';

const routes: Routes = [
  {
    path: '',
    component: EditarCatalogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarCatalogoPageRoutingModule {}
