import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaCarreraPage } from './vista-carrera.page';

const routes: Routes = [
  {
    path: '',
    component: VistaCarreraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaCarreraPageRoutingModule {}
