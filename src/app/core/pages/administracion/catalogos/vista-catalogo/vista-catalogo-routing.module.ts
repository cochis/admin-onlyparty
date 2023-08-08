import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaCatalogoPage } from './vista-catalogo.page';

const routes: Routes = [
  {
    path: '',
    component: VistaCatalogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaCatalogoPageRoutingModule {}
