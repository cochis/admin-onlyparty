import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, IonicModule, ComponentsModule, MaterialModule],
  exports: [],
})
export class CarrerasModule {}
