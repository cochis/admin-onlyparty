import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarCarreraPage } from './editar-carrera.page';

const routes: Routes = [
  {
    path: '',
    component: EditarCarreraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarCarreraPageRoutingModule {}
