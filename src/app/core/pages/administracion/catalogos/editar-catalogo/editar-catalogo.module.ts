import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCatalogoPageRoutingModule } from './editar-catalogo-routing.module';

import { EditarCatalogoPage } from './editar-catalogo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCatalogoPageRoutingModule
  ],
  declarations: [EditarCatalogoPage]
})
export class EditarCatalogoPageModule {}
