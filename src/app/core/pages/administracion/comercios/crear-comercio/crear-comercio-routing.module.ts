import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearComercioPage } from './crear-comercio.page';

const routes: Routes = [
  {
    path: '',
    component: CrearComercioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearComercioPageRoutingModule {}
