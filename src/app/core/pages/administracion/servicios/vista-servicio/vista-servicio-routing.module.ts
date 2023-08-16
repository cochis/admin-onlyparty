import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaServicioPage } from './vista-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: VistaServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaServicioPageRoutingModule {}
