import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaComercioPageRoutingModule } from './vista-comercio-routing.module';

import { VistaComercioPage } from './vista-comercio.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaComercioPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
  ],
  declarations: [VistaComercioPage]
})
export class VistaComercioPageModule { }
