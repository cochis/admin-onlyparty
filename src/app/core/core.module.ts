import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CorePageRoutingModule } from './core-routing.module';

import { CorePage } from './core.page';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [CorePage],
  imports: [CommonModule, IonicModule, CorePageRoutingModule, MaterialModule],
})
export class CorePageModule {}
