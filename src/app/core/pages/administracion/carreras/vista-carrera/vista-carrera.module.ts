import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaCarreraPageRoutingModule } from './vista-carrera-routing.module';

import { VistaCarreraPage } from './vista-carrera.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [VistaCarreraPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    VistaCarreraPageRoutingModule,
    ComponentsModule,
    MaterialModule,
  ],
})
export class VistaCarreraPageModule {}
