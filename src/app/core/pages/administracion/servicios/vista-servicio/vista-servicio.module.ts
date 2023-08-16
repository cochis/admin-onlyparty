import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaServicioPageRoutingModule } from './vista-servicio-routing.module';

import { VistaServicioPage } from './vista-servicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaServicioPageRoutingModule
  ],
  declarations: [VistaServicioPage]
})
export class VistaServicioPageModule {}
