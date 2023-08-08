import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrerasModule } from './carreras/carreras.module';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, IonicModule, MaterialModule, CarrerasModule],
})
export class AdministracionModule {}
