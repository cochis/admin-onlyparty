import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCatalogoPageRoutingModule } from './crear-catalogo-routing.module';

import { CrearCatalogoPage } from './crear-catalogo.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCatalogoPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
  ],
  declarations: [CrearCatalogoPage]
})
export class CrearCatalogoPageModule { }
