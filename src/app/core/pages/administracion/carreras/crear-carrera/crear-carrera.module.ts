import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { CrearCarreraPageRoutingModule } from './crear-carrera-routing.module'

import { CrearCarreraPage } from './crear-carrera.page'
import { ComponentsModule } from 'src/app/components/components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCarreraPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CrearCarreraPage],
})
export class CrearCarreraPageModule {}
