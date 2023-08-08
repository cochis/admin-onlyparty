import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { EditarCarreraPageRoutingModule } from './editar-carrera-routing.module'

import { EditarCarreraPage } from './editar-carrera.page'
import { ComponentsModule } from 'src/app/components/components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCarreraPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [EditarCarreraPage],
})
export class EditarCarreraPageModule {}
