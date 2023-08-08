import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaCatalogoPageRoutingModule } from './vista-catalogo-routing.module';

import { VistaCatalogoPage } from './vista-catalogo.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaCatalogoPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
  ],
  declarations: [VistaCatalogoPage]
})
export class VistaCatalogoPageModule { }
