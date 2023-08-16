import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarComercioPageRoutingModule } from './editar-comercio-routing.module';

import { EditarComercioPage } from './editar-comercio.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarComercioPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [EditarComercioPage]
})
export class EditarComercioPageModule { }
