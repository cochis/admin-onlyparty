import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaComercioPage } from './vista-comercio.page';

const routes: Routes = [
  {
    path: '',
    component: VistaComercioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaComercioPageRoutingModule {}
