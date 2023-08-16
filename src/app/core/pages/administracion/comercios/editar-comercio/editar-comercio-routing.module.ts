import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarComercioPage } from './editar-comercio.page';

const routes: Routes = [
  {
    path: '',
    component: EditarComercioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarComercioPageRoutingModule {}
